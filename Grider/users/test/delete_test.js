const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("model instance remove", (done) => {
    // removes single record w. given criteria
    joe
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        console.log("---- 3. Model instance remove!");
        done();
      });
  });

  it("class method remove", (done) => {
    // removes many records w. given criteria
    // User.remove({ name: 'Joe' })
    // DeprecationWarning: collection.remove is deprecated.
    // Use deleteOne, deleteMany, or bulkWrite instead.
    User.deleteMany({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        console.log("---- 4. Class method remove!");
        done();
      });
  });

  it("class method findOneAndRemove", (done) => {
    User.deleteOne({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        console.log("---- 5. FindOne class method remove!");
        done();
      });
  });

  it("class method findByIdAndRemove", (done) => {
    User.findByIdAndDelete(joe._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        console.log("---- 6. FindByIDAndDelete class method remove!");
        done();
      });
  });
});
