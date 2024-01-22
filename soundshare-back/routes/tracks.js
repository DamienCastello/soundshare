var express = require('express');
var router = express.Router();

const TracksController = require('../controllers/tracksController');

router.get('/', TracksController.index);
router.get('/:id', TracksController.show);
router.post('/', TracksController.create);
router.put('/:id', TracksController.update);
router.delete('/:id', TracksController.delete);

module.exports = router;