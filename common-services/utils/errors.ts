export class HttpExceptionError extends Error {
  constructor(
    public status: number,
    public message: string,
    public expose?: boolean,
    public stack?: any
  ) {
    super(message);
    this.message = message;
    this.status = status;
    this.expose = expose;
    this.stack = stack;
  }
}

// export class NotFoundError extends Error {
//   constructor(
//     public message: any,
//     public status: string,
//     public stack?: string
//   ) {
//     super(message);
//     this.name = "NotFoundError";
//     this.stack = stack;
//     this.status = status;
//   }
// }
