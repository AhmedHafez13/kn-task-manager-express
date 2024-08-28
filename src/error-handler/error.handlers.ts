import HttpErrorBase from "./http-error.base.js";

export class BadRequestError extends HttpErrorBase {
  constructor(message: string) {
    super(400, message);
    this.name = 'BadRequest';
  }
}

export class UnauthorizedError extends HttpErrorBase {
  constructor(message: string) {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends HttpErrorBase {
  constructor(message: string) {
    super(403, message);
    this.name = 'Forbidden';
  }
}

export class NotFoundError extends HttpErrorBase {
  constructor(message: string) {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

export class UnprocessableError extends HttpErrorBase {
  constructor(message: string) {
    super(422, message);
    this.name = 'Unprocessable';
  }
}
