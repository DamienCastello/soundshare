const models = require('../models');
const Resource = models.Resource;

const { faker } = require('@faker-js/faker');

for(let i = 0; i < 1; i++){
    Resource.create({
        title: 'Tuto Acid mélodique',
        description: 'Merci Skone ! Bien utile !',
        resourceLink: 'https://youtu.be/6dIChqYavYw?si=3LRDECD3TVuY-EPB',
        image: 'https://img.youtube.com/vi/6dIChqYavYw/hqdefault.jpg',
        UserId: 1
    })
    .then((resource) => { console.log(resource); })
    .catch((error) => { console.log(error); })
}