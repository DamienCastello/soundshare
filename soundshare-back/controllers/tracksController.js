const models = require('../models');
const Track = models.Track;
const Genre = models.Genre;
const User = models.User;

module.exports = {
    index: function (req, res, next) {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;
        Track.findAll({
            offset: offset,
            limit: limit,
            include: [
                { model: User },
                { model: Genre }
            ],
        })
            .then((tracks) => { res.json({ tracks }); })
            .catch((error) => { 
                console.error("Error fetching tracks: ", error);
                console.error("Message Error fetching tracks: ", error.message);
                res.status(500).json({ error }) 
            });
    },
    show: function (req, res, next) {
        Track.findByPk(req.params.id)
            .then((track) => {
                res.json({ track });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    },
    create: function (req, res, next) {
        console.log("check req body : ", req.body);

        Track.create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            music: req.body.music,
            UserId: req.body.UserId
        })
            .then((track) => {
                const genres = req.body.genres;
                if (genres && genres.length > 0) {
                    return Genre.findAll({
                        where: {
                            id: genres
                        }
                    })
                        .then((genreInstances) => {
                            return track.addGenres(genreInstances).then(() => track);
                        })
                        .catch((error) => {
                            console.error("Error finding genres to associate: ", error);
                            res.status(500).json({ error: "Error associating genres" });
                        });
                } else {
                    return track;
                }
            })
            .then((track) => {
                res.json({ track });
            })
            .catch((error) => {
                console.error("Error creating track: ", error);
                res.status(500).json({ error: error.message });
            });
    },
    update: function (req, res, next) {
        Track.findByPk(req.params.id)
            .then((track) => {
                track.update({
                    title: req.body.title,
                    description: req.body.description,
                    image: req.body.image,
                    UserId: req.body.UserId
                })
                    .then((updatedTrack) => { res.json({ updatedTrack }); })
                    .catch((error) => { res.status(500).json({ error }) })
            })
            .catch((error) => { res.status(500).json({ error }) })
    },
    delete: function (req, res, next) {
        Track.findByPk(req.params.id)
            .then((track) => { track.destroy() })
            .catch((error) => { res.status(500).json({ error }) })
    }
}