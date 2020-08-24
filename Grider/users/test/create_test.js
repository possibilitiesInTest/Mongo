const assert = require('assert');
const User = require('../src/user');
const { doesNotMatch } = require('assert');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({ name: 'Joe' });
        
        joe.save()
        .then(() => {
            // Has Joe been saved succesfully
            assert(!joe.isNew);
            console.log('Joe is new!');
            done();
        });
    });
});

