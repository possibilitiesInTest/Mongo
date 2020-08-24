const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () =>{
    let joe;

    beforeEach((done) =>{
        joe = new User({ name: 'Joe' });
        joe.save()
        .then(() => done());
    });

    it('finds all users with a name of joe \n verify user._id matches id in mongo \n \n', 
        (done) => {
        User.find({ name: 'Joe' })
        .then((users) => {
            // console.log(users[0].id);
            // console.log(joe._id)
            //._id_ObjectId({""}) requires .toString()
            assert(users[0]._id.toString() === joe._id.toString());
            console.log('+++User._id matches id in mongo!');
            done();
        })
    })

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: joe._id })
        .then((user) => {
            assert(user.name === 'Joe');
            console.log('+++findOne User w. _id')
            done();
        });
    });
});