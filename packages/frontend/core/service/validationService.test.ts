import { IsNotEmpty, IsString, ValidationError } from "class-validator";

import { assignObject, validationService } from "./validationService";

describe("assignObject", () => {
  class TestDTO {
    @IsString()
    a: string;
  }
  it("success test", async () => {
    const source = {
      a: "hello",
    };
    const result = assignObject(new TestDTO(), source);

    expect(result).toEqual({ a: expect.any(String) });
  });

  it("fail test", async () => {
    const source = {
      a: "hello",
      b: "world",
    };
    const result = assignObject(new TestDTO(), source);
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
    const result = await validationService().getValidation(
      new TestDTO(),
      source
    );

    expect(result).toBeInstanceOf(TestDTO);
  });

  it("fail will thrown error result", async () => {
    const source = {
      a: "hello",
    };

    const expectedObject = [
      {
        property: "b",
        // constraints: {},
      },
    ];

    const result = async () =>
      await validationService().getValidation(new TestDTO(), source);

    await expect(result()).rejects.toMatchObject(expectedObject);
  });
});
