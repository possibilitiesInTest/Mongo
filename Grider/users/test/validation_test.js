const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  xit("requires a user name", (done) => {
    const user = new User({ name: "Ale" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name is required.");
    console.log("++++ 15. Validated name");
    done();
  });

  xit("requires a user's name longer than 2 characters", (done) => {
    const user = new User({ name: "Ala" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name must be longer than 2 characters.");
    console.log("++++ 16. name longer than 2 chars");
    done();
  });

  xit("dissallows invalid records from being saved", (done) => {
    const user = new User({ name: "Ala" });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === "Name must be longer than 2 characters");
      console.log("++++ 17. Disallows invalid record from being saved");
      done();
    });
  });
});
