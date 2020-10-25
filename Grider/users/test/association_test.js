const mongoose = require("mongoose");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations tests", () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is",
    });
    comment = new Comment({ content: "Congrats on great post" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // joe.save();
    // blogPost.save();
    // comment.save();

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("saves a relation between a user and a blogpost", (done) => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then((user) => {
        console.log(user);
        console.log("++++ 1. saves a relation between user and post");
        done();
      });
  });
});
