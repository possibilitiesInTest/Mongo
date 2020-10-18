const assert = require('assert');
const User = require('../src/user');
const { doesNotMatch } = require('assert');

describe('Creating records', () => {
let joe

    it('saves a user', (done) => {
        const joe = new User({ name: 'Joe' });
        joe.save()
        .then(() => {
            // Has Joe been saved succesfully
            assert(!joe.isNew);
            done();
        });
        console.log('++++ 1. Joe is new!');
    });

    // it('A model instance can update', () => {
    //     joe.set('name', 'Alex');
    //     joe.save()
    //     .then(() => User.find({}))
    //     .then((users) => {
    //         assert(users.length === 1);
    //         assert(users[0].name === 'Alex');
    //         done();
        // });
    // });
});


