const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("requires a user name", () => {
    const user = new User({ name: "Wall" });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;

      assert(message === "Name is required.");
      console.log("++++ 21. Validated name");
    });
  });

  it("requires a user's name longer than 2 characters", () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name must be longer than 2 characters.");
    console.log("++++ 22. name longer than 2 chars");
  });

  it("disallows invalid records from being saved", (done) => {
    const user = new User({ name: "Al" });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;

      assert(message === "Name must be longer than 2 characters.");
      console.log("++++ 23. Disallows invalid record from being saved");
      done();
    });
  });
});
