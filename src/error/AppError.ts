export class AppError extends Error {
  public readonly statusCode: number;

  constructor(error: string, statusCode: number) {
    super(error);

    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
