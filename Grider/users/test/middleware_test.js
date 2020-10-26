const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is",
    });

    joe.blogPosts.push(blogPost);
    // blogPost.comments.push(comment);
    // comment.user = joe;

    // joe.save();
    // blogPost.save();
    // comment.save();

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it("users clean up dangling blogposts on remove", (done) => {
    joe
      .remove()
      .then(() => BlogPost.estimatedDocumentCount())
      .then((count) => {
        assert(count === 0);
        console.log("---- 8 remove dangling associations with UserSchema.pre");
        done();
      });
  });
});
