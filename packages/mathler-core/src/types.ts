export enum GameStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Finished = 'Finished',
  GameOver = 'GameOver',
}

export enum CharStatus {
  Correct = 'Correct',
  Incorrect = 'Incorrect',
  InTheOperation = 'InTheOperation',
}

export enum AttemptStatus {
  Correct = 'Correct',
  Incorrect = 'Incorrect',
}

export interface AttemptEvalResult {
  index: number;
  value: string;
  status: CharStatus;
}

export interface Attempt {
  input: string;
  status: AttemptStatus;
  result: AttemptEvalResult[];
}

export interface MathlerConfig {
  maxAttempts?: number;
  calculation?: string;
}

export interface ExpressionEvaluationResult {
  result: number;
  expression: string;
}
