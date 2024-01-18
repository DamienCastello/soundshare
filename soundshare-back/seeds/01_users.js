const models = require('../models');
const User = models.User;

const { faker } = require('@faker-js/faker');

User.create({
    name: faker.person.lastName(),
    email: faker.internet.email(),
    password: 'test1234',
    isAdmin: false,
    isArtist: false,
    avatar: faker.internet.avatar()
})
.then((user) => { console.log(user); })
.catch((error) => { console.log(error); })