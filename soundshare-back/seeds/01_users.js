const models = require('../models');
const User = models.User;

const { faker } = require('@faker-js/faker');

User.create({
    name: 'Gamma',
    email: 'gamma@gmail.com',
    password: '$2b$10$17fD0IHFdS2.O45DNgmDkuBVOjS7YxsNKSWNvvpIsfCzTrvjDKONa',
    isAdmin: false,
    isArtist: true,
    avatar:  null
})
.then((user) => { console.log(user); })
.catch((error) => { console.log(error); })