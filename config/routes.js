var express  = require('express');
var router   = express.Router();

var usersController           = require('../controllers/users');
var authenticationsController = require('../controllers/authentications');
var materialsController       = require('../controllers/materials');


router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .patch(usersController.update)
  .delete(usersController.delete);

router.route('/materials')
  .get(materialsController.index);

module.exports = router;
