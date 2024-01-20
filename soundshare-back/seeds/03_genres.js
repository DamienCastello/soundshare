const models = require('../models');
const Genre = models.Genre;

const { faker } = require('@faker-js/faker');

Genre.create({
    name: faker.music.genre(),
})
.then((genre) => { console.log(genre); })
.catch((error) => { console.log(error); })