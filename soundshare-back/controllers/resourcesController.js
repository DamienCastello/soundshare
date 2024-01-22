const models = require('../models');
const Resource = models.Resource;

module.exports = {
    index: function(req, res, next) {
        const offset = parseInt(req.query.offset) || 0; // Assurez-vous que les valeurs d'offset et de limit sont des nombres
        const limit = parseInt(req.query.limit) || 10; // Vous pouvez ajuster la valeur par défaut selon vos besoins
        Resource.findAll({
            offset: offset,
            limit: limit,
            include: [models.User],
            })
            .then((resources) => { res.json({ resources }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    show: function(req, res, next) {
        Resource.findAll({
            id: req.query.id,
            include: [models.User],
        })
        .then((resources) => {
            res.json({ resources });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    },
    create: function(req, res, next) {
        Resource.create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            userId: req.body.userId
        })
            .then((resource) => { res.json({ resource }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    update: function(req, res, next) {
        Resource.findByPk(req.params.id)
            .then((resource) => { resource.update({
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                userId: req.body.userId
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