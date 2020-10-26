const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "PostTitle");
        console.log("++++ 12. creates a subdocument");
        done();
      });
  });

  it("can add subdocuments to an existing user", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "New Post" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "New Post");
        console.log("++++ 13. adds subdocument to existing user");
        done();
      });
  });

  it("Can remove a subdocument", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "New Title" }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })

      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts.length === 0);
        console.log("++++ 14. removes a subdocument");
        done();
      });
  });
});
