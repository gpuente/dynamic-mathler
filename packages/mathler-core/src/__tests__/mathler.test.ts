import { MathlerConfig, CharStatus, GameStatus } from '../types';
import { Mathler } from '../mathler';

describe('mathler', () => {
  describe('instance', () => {
    it('should throw an error if maxAttempts is <= 0', () => {
      const mathlerConfig: MathlerConfig = {
        maxAttempts: 0,
      };

      const instanceCreation = () => new Mathler(mathlerConfig);

      expect(instanceCreation).toThrowError(
        'Max attempts must be greater than 0'
      );
    });

    it('should throw an error if maxAttempts is > 10', () => {
      const mathlerConfig: MathlerConfig = {
        maxAttempts: 11,
      };

      const instanceCreation = () => new Mathler(mathlerConfig);

      expect(instanceCreation).toThrowError(
        'Max attempts must be less than 10'
      );
    });

    it('should set maxAttempts to 6 if not provided', () => {
      const mathlerConfig: MathlerConfig = {};

      const mathler = new Mathler(mathlerConfig);

      expect(mathler.maxAttempts).toBe(6);
    });

    it('should set maxAttempts to provided value', () => {
      const mathlerConfig: MathlerConfig = {
        maxAttempts: 3,
      };

      const mathler = new Mathler(mathlerConfig);

      expect(mathler.maxAttempts).toBe(3);
    });

    it('should set status to NotStarted', () => {
      const mathlerConfig: MathlerConfig = {};

      const mathler = new Mathler(mathlerConfig);

      expect(mathler.status).toBe('NotStarted');
    });
  });

  describe('input attempt validation', () => {
    let mathler: Mathler;

    beforeEach(() => {
      mathler = new Mathler();
    });

    it('should normalize input', () => {
      const badFormattedInput = 'f1+s2.*u71';
      const expectedNormalizedInput = '1+2*71';
      const normalizedInput = mathler.normalize(badFormattedInput);

      expect(normalizedInput).toBe(expectedNormalizedInput);
    });

    it('should not normalize a valid expression', () => {
      const validInput = '1+2*71';
      const normalizedInput = mathler.normalize(validInput);

      expect(normalizedInput).toBe(validInput);
    });

    it('should return an error if the expression input length is < 6', () => {
      const badFormattedInput = '1+2*7';
      const normalizeInput = () => mathler.normalize(badFormattedInput);

      expect(normalizeInput).toThrowError(
        'Invalid expression length, must be 6 chars'
      );
    });
  });

  describe('expression evaluation', () => {
    let mathler: Mathler;

    beforeEach(() => {
      mathler = new Mathler();
    });

    it('should return right values after evaliation', () => {
      const expectedResult = 143;
      const expressionInput = '1+2*71';

      const { result, expression } =
        mathler.evaluateExpression(expressionInput);

      expect(result).toBe(expectedResult);
      expect(expression).toBe(expression);
    });

    it('should throw an error if expression is not valid', () => {
      const badFormattedInput = '1+/2*7';
      const evaluateExpression = () =>
        mathler.evaluateExpression(badFormattedInput);

      expect(evaluateExpression).toThrowError('Invalid expression');
    });
  });

  describe('attempt validation', () => {
    let mathler: Mathler;
    const calculation = '1+2*71';

    beforeEach(() => {
      const config: MathlerConfig = { calculation };
      mathler = new Mathler(config);
    });

    it('should return correct status if attempt is correct', () => {
      const attemptValidation = mathler.validateAttempt(calculation);

      expect(attemptValidation.status).toBe('Correct');
    });

    it('should return incorrect status if attempt is incorrect', () => {
      const attempt = '1+2*72';
      const attemptValidation = mathler.validateAttempt(attempt);

      expect(attemptValidation.status).toBe('Incorrect');
    });

    it('should return correct status with cumulative solution', () => {
      const attempt = '71*2+1';
      const attemptValidation = mathler.validateAttempt(attempt);

      expect(attemptValidation.status).toBe('Correct');
    });

    it('should return incorrect status when same expressions items produce a different result than expected', () => {
      const attempt = '2+1*71';
      const attemptValidation = mathler.validateAttempt(attempt);

      expect(attemptValidation.status).toBe('Incorrect');
    });

    it('should return right status for individual items in the input expression', () => {
      const attempt = '2/61-1';
      const attemptValidation = mathler.validateAttempt(attempt);

      expect(attemptValidation.result[0]).toEqual({
        index: 0,
        value: '2',
        status: CharStatus.InTheOperation,
      });

      expect(attemptValidation.result[1]).toEqual({
        index: 1,
        value: '/',
        status: CharStatus.Incorrect,
      });

      expect(attemptValidation.result[2]).toEqual({
        index: 2,
        value: '6',
        status: CharStatus.Incorrect,
      });

      expect(attemptValidation.result[3]).toEqual({
        index: 3,
        value: '1',
        status: CharStatus.InTheOperation,
      });

      expect(attemptValidation.result[4]).toEqual({
        index: 4,
        value: '-',
        status: CharStatus.Incorrect,
      });

      expect(attemptValidation.result[5]).toEqual({
        index: 5,
        value: '1',
        status: CharStatus.Correct,
      });
    });
  });

  describe('game', () => {
    let mathler: Mathler;
    let onStatusChange: jest.Mock;
    const calculation = '1+2*71';
    const expectedResult = 143;

    beforeEach(() => {
      const config: MathlerConfig = { calculation };
      onStatusChange = jest.fn();

      mathler = new Mathler(config);
      mathler.onStatusChange(onStatusChange);
    });

    it('should start the game when an attempt is made', () => {
      expect(mathler.status).toBe(GameStatus.NotStarted);

      const inputAttempt = '99+123';
      mathler.registerAttempt(inputAttempt);

      expect(mathler.status).toBe(GameStatus.InProgress);
      expect(onStatusChange).toHaveBeenCalledWith(GameStatus.InProgress);
    });

    it('should finish the game when a correct attempt is registered', () => {
      mathler.registerAttempt(calculation);
      expect(mathler.status).toBe(GameStatus.Finished);
      expect(onStatusChange).toHaveBeenCalledWith(GameStatus.Finished);
    });

    it('should change status game to GameOver when max attempts reached with no success', () => {
      const incorrectAttempt = '1+2*72';

      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);

      expect(mathler.status).toBe(GameStatus.GameOver);
      expect(onStatusChange).toHaveBeenCalledWith(GameStatus.GameOver);
    });

    it('should throw an error when trying to register a new attempt in a finished game', () => {
      mathler.registerAttempt(calculation);

      const attempt = () => mathler.registerAttempt(calculation);

      expect(attempt).toThrowError(
        "You can't register more attempts in a game with status: Finished"
      );
    });

    it('should throw an error when trying to register a new attempt after game over', () => {
      const incorrectAttempt = '1+2*72';

      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);
      mathler.registerAttempt(incorrectAttempt);

      const attempt = () => mathler.registerAttempt(calculation);

      expect(attempt).toThrowError(
        "You can't register more attempts in a game with status: GameOver"
      );
    });

    it('should start a new game when restart is executed', () => {
      const incorrectAttempt = '1+2*72';
      mathler.registerAttempt(incorrectAttempt);

      mathler.restart();
      expect(mathler.status).toBe(GameStatus.InProgress);
      expect(onStatusChange).toHaveBeenCalledWith(GameStatus.InProgress);
      expect(mathler.attempts.length).toBe(0);
      expect(mathler.expectedResult !== expectedResult).toBeTruthy();
      expect(mathler.calculation !== calculation).toBeTruthy();
    });
  });
});
