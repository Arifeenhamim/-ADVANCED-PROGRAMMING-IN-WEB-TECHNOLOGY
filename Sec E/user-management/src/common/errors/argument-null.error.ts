export class ArgumentNullError extends Error {
  public paramName: string;
  constructor(paramName?: string) {
    super("Value can not be null or undefined");
    this.paramName = paramName ?? "";
  }
}
