const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe", likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  }

  it("instance type using set n save", (done) => {
    joe.set("name", "Alex");
    assertName(joe.save(), done);
    console.log("++++ 15. update using Set and Save");
  });

  it("A model instance can update", (done) => {
    assertName(joe.updateOne({ name: "Alex" }), done);
    console.log("++++ 16. update using assertName model instance");
  });

  it("A model class can update", (done) => {
    assertName(User.updateMany({ name: "Joe" }, { name: "Alex" }), done);
    console.log("++++ 17. updateMany model class");
  });

  it("A model class can update one record", (done) => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
    console.log("++++ 18. findOneAndUpdate model class");
  });

  it("A model class can find a record with an Id and update", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
    console.log("++++ 19. findByIdAndUpdate model class one record");
  });

  it("A user can have their postcount incremented by 1", (done) => {
    User.updateMany({ name: "Joe" }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
    console.log("++++ 20. increment posCount by 1");
  });
});
