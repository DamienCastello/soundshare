const models = require('../models');
const Track = models.Track;

module.exports = {
    index: function(req, res, next) {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;
        Track.findAll({
            offset: offset,
            limit: limit,
            include: [models.User],
            })
            .then((tracks) => { res.json({ tracks }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    show: function(req, res, next) {
        Track.findByPk(req.params.id)
        .then((track) => {
            res.json({ track });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    },
    create: function(req, res, next) {
        Track.create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            music: req.body.music,
            userId: req.body.userId
        })
            .then((track) => { res.json({ track }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    update: function(req, res, next) {
        Track.findByPk(req.params.id)
            .then((track) => { track.update({
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                userId: req.body.userId
            })
                .then((updatedTrack) => { res.json({ updatedTrack }); })
                .catch((error) => { res.status(500).json({error}) })
            })
            .catch((error) => { res.status(500).json({error}) })
    },
    delete: function(req, res, next) {
        Track.findByPk(req.params.id)
            .then((track) => { track.destroy() })
            .catch((error) => { res.status(500).json({error}) })
    }
}