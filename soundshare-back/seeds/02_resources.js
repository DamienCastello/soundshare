const models = require('../models');
const Resource = models.Resource;

const { faker } = require('@faker-js/faker');

for(let i = 0; i < 1; i++){
    Resource.create({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        image: faker.image.avatar(),
        UserId: 1
    })
    .then((resource) => { console.log(resource); })
    .catch((error) => { console.log(error); })
}