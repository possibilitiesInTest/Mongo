const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe, maria, alex, zach;

  beforeEach((done) => {
    alex = new User({ name: "Alex" });
    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });
    joe = new User({ name: "Joe" });

    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]).then(() =>
      done()
    );
  });

  it("finds all users with a name of joe \n verify user._id matches id in mongo \n \n", (done) => {
    User.find({ name: "Joe" }).then((users) => {
      // console.log(users[0].id);
      // console.log(joe._id)
      //._id_ObjectId({""}) requires .toString()
      assert(users[0]._id.toString() === joe._id.toString());
      console.log("++++ 9. User._id matches id in mongo!");
      done();
    });
  });

  it("find a user with a particular id", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === "Joe");
      console.log("++++ 10. findOne User w. _id");
      done();
    });
  });

  it("can skip and limit the result set", (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1].name === "Maria");
        console.log(
          "++++ 11. skip and limit result set of query w. sorted collection"
        );
        done();
      });
  });
});
