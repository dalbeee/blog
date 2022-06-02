import jwtDecode from "jwt-decode";

describe("test deleteToken", () => {
  it("jwtDecode test fail will throw error Array", async () => {
    const result = () => jwtDecode("hello");

    try {
      expect(result()).toEqual(String);
    } catch (error) {
      console.log(error);
      expect(error).toEqual(expect.arrayContaining([]));
    }
  });

  it("jwtDecode success will return User", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QudGVzdCIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNjM0NzkxMTMyLCJleHAiOjE2MzQ3OTY1MzJ9.GB63E13jX1DiAKwLTLURWvGIahT-Xd0wysxHoCdDWL8";

    const result = jwtDecode(token);
    console.log(result);
    expect(result).toMatchObject({ iat: expect.any(Number) });
  });

  it("exp expired check", async () => {
    const exp = 1634796532;

    const result = exp - +new Date() / 1000;
    console.log(result);
  });
});
