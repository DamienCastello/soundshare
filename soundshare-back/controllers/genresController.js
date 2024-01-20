const models = require('../models');
const Genre = models.Genre;

module.exports = {
    index: function(req, res, next) {
        Genre.findAll()
            .then((genres) => { res.json({ genres }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    show: function(req, res, next) {
        Genre.findByPk(req.params.id)
            .then((genre) => { res.json({ genre }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    create: function(req, res, next) {
        Genre.create({
            name: req.params.name
        })
            .then((genre) => { res.json({ genre }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    update: function(req, res, next) {
        Genre.findByPk(req.params.id)
            .then((genre) => { genre.update({
                name: req.params.name
            })
                .then((updatedGenre) => { res.json({ updatedGenre }); })
                .catch((error) => { res.status(500).json({error}) })
             })
            .catch((error) => { res.status(500).json({error}) })
    },
    delete: function(req, res, next) {
        Genre.findByPk(req.params.id)
            .then((genre) => { genre.destroy() })
            .catch((error) => { res.status(500).json({error}) })
    }
}