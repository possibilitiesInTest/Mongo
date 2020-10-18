Promise = require("bluebird")
Promise.config({
  longStackTraces: true,
  warnings: {
    wForgottenReturn: false
  }
})
mongoose = require('mongoose')
mongoose.Promise = global.Promise;


before((done) => {
    mongoose.connect('mongodb://localhost/users_test', 
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    mongoose.connection
    .once('open', () => { done()})
    .on('error', (error) => {
        console.warn('Error CONNECTION', error);
    });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
    done();
    });
})