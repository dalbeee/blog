import { IsNotEmpty, IsString, ValidationError } from "class-validator";

import { ValidationService } from "./validationService";

const validateService = new ValidationService();

describe("assignObject", () => {
  class TestDTO {
    @IsString()
    a: string;
  }

  it("success test", async () => {
    const source = {
      a: "hello",
    };
    const result = validateService.assignObject(new TestDTO(), source);

    expect(result).toEqual({ a: expect.any(String) });
  });

  it("fail test", async () => {
    const source = {
      a: "hello",
      b: "world",
    };
    const result = validateService.assignObject(new TestDTO(), source);
    expect(result).not.toEqual({
      a: expect.any(String),
    });
  });
});

describe("validationService.getValidation", () => {
  class TestDTO {
    @IsString()
    a: string;

    @IsNotEmpty()
    b?: string;
  }

  it("success will return <T>", async () => {
    const source = {
      a: "hello",
      b: "world",
    };
    const result = await validateService.getValidation(new TestDTO(), source);

    expect(result).toBeInstanceOf(TestDTO);
  });

  it("fail will thrown error result array", async () => {
    const source = {
      a: "hello",
    };

    const result = async () =>
      await validateService.getValidation(new TestDTO(), source);

    await expect(result()).rejects.toEqual(["b should not be empty"]);
  });
});
