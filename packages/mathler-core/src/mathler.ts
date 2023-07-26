/* eslint-disable no-eval */
import {
  Attempt,
  GameStatus,
  CharStatus,
  MathlerConfig,
  AttemptStatus,
  AttemptEvalResult,
  ExpressionEvaluationResult,
} from './types';
import { CALCULATIONS_LIST } from './utils';

export class Mathler {
  /* properties */
  private readonly operationRegexp = /[^0-9+\-*/]/g;
  private readonly defaultMaxAttempts = 6;
  private readonly expressionLength = 6;
  private _expectedResult: number;
  private _calculation: string;
  private _status: GameStatus;
  private _maxAttempts: number;
  private _attempts: Attempt[] = [];
  private _onStatusChange?: (status: GameStatus) => void;

  constructor(config?: MathlerConfig) {
    this.validateMaxAttempts(config?.maxAttempts);

    const { result, expression } = this.evaluateExpression(
      config?.calculation || this.getRandomCalculation()
    );

    this._maxAttempts = config?.maxAttempts ?? this.defaultMaxAttempts;
    this._calculation = expression;
    this._status = GameStatus.NotStarted;
    this._expectedResult = result;
  }

  /* getters and setters */
  public get maxAttempts(): number {
    return this._maxAttempts;
  }

  public get status(): GameStatus {
    return this._status;
  }

  public set status(_status: GameStatus) {
    this._status = _status;

    if (this._onStatusChange) {
      this._onStatusChange(_status);
    }
  }

  public get attempts(): Attempt[] {
    return this._attempts;
  }

  public get expectedResult(): number {
    return this._expectedResult;
  }

  public get calculation(): string {
    return this._calculation;
  }

  /* methods */
  private validateMaxAttempts(maxAttempts?: number): void {
    if (typeof maxAttempts !== 'number') return;

    if (maxAttempts < 1) {
      throw new Error('Max attempts must be greater than 0');
    }

    if (maxAttempts > 10) {
      throw new Error('Max attempts must be less than 10');
    }
  }

  private getRandomCalculation(): string {
    return CALCULATIONS_LIST[
      Math.floor(Math.random() * CALCULATIONS_LIST.length)
    ];
  }

  // Remove all chars that are not numbers or operators
  public normalize(input: string): string {
    const normalizedInput = input.replace(this.operationRegexp, '').slice(0, 6);

    if (normalizedInput.length !== this.expressionLength) {
      throw new Error('Invalid expression length, must be 6 chars');
    }
    return normalizedInput;
  }

  // Start the game
  public start(): void {
    this.status = GameStatus.InProgress;
  }

  // Evaluate the expression and return the result
  public evaluateExpression(input: string): ExpressionEvaluationResult {
    const normalizedInput = this.normalize(input);

    try {
      return {
        result: eval(normalizedInput),
        expression: normalizedInput,
      };
    } catch {
      throw new Error(
        `Invalid expression: ${normalizedInput} [source: ${input}]`
      );
    }
  }

  // Validate the attempt and return the result for each char
  public validateAttempt(input: string): Attempt {
    const { result, expression } = this.evaluateExpression(input);
    const attemptEvalResult: AttemptEvalResult[] = [];

    // Evaluate each char in the input expression
    [...expression].forEach((char, index) => {
      const validationResult: AttemptEvalResult = {
        index,
        value: char,
        status: CharStatus.Incorrect,
      };

      // validate if char is in the same position than the expected calculation expression
      if (this._calculation[index] === char) {
        validationResult.status = CharStatus.Correct;

        attemptEvalResult.push(validationResult);
        return;
      }

      // validate if char is in the expected expression
      if (this._calculation.includes(char)) {
        validationResult.status = CharStatus.InTheOperation;

        attemptEvalResult.push(validationResult);
        return;
      }

      attemptEvalResult.push(validationResult);
    });

    // Evaluate attempt status: if the result is correct and all chars are correct or in the operation, then the attempt is correct
    let attemptStatus: AttemptStatus = AttemptStatus.Incorrect;
    const isExpressionCorrect = attemptEvalResult.every(
      (res) =>
        res.status === CharStatus.Correct ||
        res.status === CharStatus.InTheOperation
    );

    if (result === this.expectedResult && isExpressionCorrect) {
      attemptStatus = AttemptStatus.Correct;
    }

    return {
      input: expression,
      status: attemptStatus,
      result: attemptEvalResult,
    };
  }

  // Register an attempt in the game and return the result
  public registerAttempt(input: string): Attempt {
    if (this._attempts.length > this._maxAttempts) {
      throw new Error('Max attempts reached');
    }

    if (
      this.status === GameStatus.GameOver ||
      this.status === GameStatus.Finished
    ) {
      throw new Error(
        `You can't register more attempts in a game with status: ${this.status}`
      );
    }

    if (this.status === GameStatus.NotStarted) {
      this.start();
    }

    const attempt = this.validateAttempt(input);
    this._attempts.push(attempt);

    if (attempt.status === AttemptStatus.Correct) {
      this.status = GameStatus.Finished;
    }

    if (this._attempts.length === this._maxAttempts) {
      this.status = GameStatus.GameOver;
    }

    return attempt;
  }

  // Restart the game
  public restart(calculation?: string): void {
    const { result, expression } = this.evaluateExpression(
      calculation || this.getRandomCalculation()
    );

    this._attempts = [];
    this.status = GameStatus.InProgress;
    this._calculation = expression;
    this._expectedResult = result;
  }

  // Register a callback to be called when the game status changes
  public onStatusChange(callback: (status: GameStatus) => void): void {
    this._onStatusChange = callback;
  }
}
