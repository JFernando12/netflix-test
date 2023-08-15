import { CustomError } from './custom-error';

export class ElementNotFoundError extends CustomError {
  statusCode = 404;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ElementNotFoundError.prototype);
  }
}
