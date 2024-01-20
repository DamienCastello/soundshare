const models = require('../models');
const User = models.User;

module.exports = {
    index: function(req, res, next) {
        User.findAll({include: models.Resource})
            .then((users) => { res.json({ users }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    show: function(req, res, next) {
        User.findByPk(req.params.id, {include: models.Resource})
            .then((user) => { res.json({ user }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    create: function(req, res, next) {
        User.create({
            name: req.params.name,
            password: req.params.password,
            email: req.params.email,
            isAdmin: req.params.isAdmin,
            isArtist: req.params.isArtist,
            avatar: req.params.avatar
        })
            .then((user) => { res.json({ user }); })
            .catch((error) => { res.status(500).json({error}) })
    },
    update: function(req, res, next) {
        User.findByPk(req.params.id)
            .then((user) => { user.update({
                name: req.params.name,
                password: req.params.password,
                email: req.params.email,
                isAdmin: req.params.isAdmin,
                isArtist: req.params.isArtist,
                avatar: req.params.avatar
            })
                .then((updatedUser) => { res.json({ updatedUser }); })
                .catch((error) => { res.status(500).json({error}) })
             })
            .catch((error) => { res.status(500).json({error}) })
    },
    delete: function(req, res, next) {
        User.findByPk(req.params.id)
            .then((user) => { user.destroy() })
            .catch((error) => { res.status(500).json({error}) })
    }
}