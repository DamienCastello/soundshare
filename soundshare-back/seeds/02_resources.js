const models = require('../models');
const Resource = models.Resource;

const { faker } = require('@faker-js/faker');

Resource.create({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.avatar(),
    userId: 1
})
.then((resource) => { console.log(resource); })
.catch((error) => { console.log(error); })