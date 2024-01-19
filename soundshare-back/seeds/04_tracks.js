const models = require('../models');
const Track = models.Track;

const { faker } = require('@faker-js/faker');

const track = Track.create({
    title: faker.music.songName(),
    description: faker.lorem.paragraph(),
    image: faker.image.avatar(),
    music: faker.system.fileExt('audio/mpeg'),
    userId: 1
})
.then((tracks) => { console.log(tracks); })
.catch((error) => { console.log(error); })