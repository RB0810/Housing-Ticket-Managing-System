//define test tools/libraries
import hello from "./hello.js"

describe("my react component", () => {
  test("is working as expected", () => {
    expect(hello()).toBe("Hello");
  });
});
