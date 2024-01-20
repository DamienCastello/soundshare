var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/usersController')

/* GET resources listing. */
router.get('/', UsersController.index);
//show
router.get('/:id', UsersController.show);
//create
router.post('/', UsersController.create);
//update
router.put('/:id', UsersController.update);
//delete
router.delete('/:id', UsersController.delete);

module.exports = router;
