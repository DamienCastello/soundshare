const models = require('../models');
const Resource = models.Resource;

module.exports = {
    index: function(req, res, next) {
        Resource.findAll({include: models.User})
            .then((resources) => { res.json({ resources }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    show: function(req, res, next) {
        Resource.findByPk(req.params.id, {include: models.User})
            .then((resource) => { res.json({ resource }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    create: function(req, res, next) {
        Resource.create({
            title: req.params.title,
            description: req.params.description,
            image: req.params.image,
            userId: req.params.userId
        })
            .then((resource) => { res.json({ resource }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    update: function(req, res, next) {
        Resource.findByPk(req.params.id)
            .then((resource) => { resource.update({
                title: req.params.title,
                description: req.params.description,
                image: req.params.image,
                userId: req.params.userId
            })
                .then((updatedResource) => { res.json({ updatedResource }); })
                .catch((error) => { res.status(500).json({error}) })
             })
            .catch((error) => { res.status(500).json({error}) })
    },
    delete: function(req, res, next) {
        Resource.findByPk(req.params.id)
            .then((resource) => { resource.destroy() })
            .catch((error) => { res.status(500).json({error}) })
    }
}