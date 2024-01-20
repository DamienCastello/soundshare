var express = require('express');
var router = express.Router();

const GenresController = require('../controllers/genresController')

/* GET resources listing. */
router.get('/', GenresController.index);
//show
router.get('/:id', GenresController.show);
//create
router.post('/', GenresController.create);
//update
router.put('/:id', GenresController.update);
//delete
router.delete('/:id', GenresController.delete);

module.exports = router;
