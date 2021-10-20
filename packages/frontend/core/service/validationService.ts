import { validate, ValidationError } from "class-validator";

export class ValidationService {
  async getValidation<T>(target: T, source: object): Promise<T> {
    const newObject = this.assignObject(target, source);

    const validationError = await validate(newObject as Object);

    if (!validationError.length) {
      return newObject;
    } else {
      throw await this.parseValidationErrorToMessage(validationError);
    }
  }

  assignObject<T>(target: T, source: Object) {
    return Object.keys(source).reduce((_, v) => {
      target[v] = source[v];
      return target;
    }, target);
  }

  async parseValidationErrorToMessage(error: ValidationError[]) {
    const errorMessage = error?.map(
      (item) => Object.values(item?.constraints)?.[0]
    );

    return errorMessage;
  }
}
