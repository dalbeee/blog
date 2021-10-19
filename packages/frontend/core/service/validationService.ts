import { validate } from "class-validator";

export const validationService = () => {
  const getValidation = async <T>(target: T, source: object): Promise<T> => {
    const newObject = assignObject(target, source);

    const validationError = await validate(newObject as Object);

    if (!validationError.length) {
      return newObject;
    } else {
      throw validationError;
    }
  };

  return { getValidation };
};

export const assignObject = <T>(target: T, source: Object) => {
  return Object.keys(source).reduce((_, v) => {
    target[v] = source[v];
    return target;
  }, target);
};
