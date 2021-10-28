import { validate, ValidationError } from "class-validator";

export class ValidationService {
  /** new DTO(), sourceObject */
  async validate<T>(target: T, source: object): Promise<T> {
    const newObject = this.assignObject(target, source);

    const validationError = await validate(newObject as Object);

    if (!validationError.length) {
      return newObject;
    } else {
      throw await this.parseValidationErrorToMessage(validationError);
    }
  }

  private assignObject<T>(target: T, source: Object) {
    return Object.keys(source).reduce((_, v) => {
      target[v] = source[v];
      return target;
    }, target);
  }

  private async parseValidationErrorToMessage(error: ValidationError[]) {
    const errorMessage = error?.map(
      (item) => Object.values(item?.constraints)?.[0]
    );

    return errorMessage;
  }
}
