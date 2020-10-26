const assert = require("assert");
const User = require("../src/user");

describe("Virtual types", () => {
  it("postCount returns number of posts", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }],
    });

    joe
      .save()
      .then(() => User.findOne({ title: "PostTitle" }))
      .then((user) => {
        assert(joe.postCount === 1);
        console.log("++++ 24. Validate virtual property");
        done();
      });
  });
});
