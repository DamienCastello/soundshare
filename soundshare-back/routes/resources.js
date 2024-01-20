var express = require('express');
var router = express.Router();

const ResourcesController = require('../controllers/resourcesController')

/* GET resources listing. */
router.get('/', ResourcesController.index);
//show
router.get('/:id', ResourcesController.show);
//create
router.post('/', ResourcesController.create);
//update
router.put('/:id', ResourcesController.update);
//delete
router.delete('/:id', ResourcesController.delete);

module.exports = router;
