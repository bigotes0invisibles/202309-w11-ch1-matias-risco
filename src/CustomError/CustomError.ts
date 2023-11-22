class CustomError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly privateMessage?: string,
  ) {
    super(message);
  }
}

export default CustomError;
