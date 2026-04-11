export class ApiError extends Error {
  constructor(status, msg) {
    super(msg);
    this.status = status;
    this.name = "ApiError";
  }
}
