import { isUuidString } from ".";

describe("test uuid", () => {
  const uuid = "e4ed7dfe-53e7-4226-a085-e977eaf090f0";
  const notUuid = "5f2ca260-919e-405e-8c88-5df56fa3089";

  it("with uuid return true", () => {
    expect(isUuidString(uuid)).toEqual(true);
  });

  it("with not uuid string return false", () => {
    expect(isUuidString(notUuid)).toEqual(false);
  });
});
