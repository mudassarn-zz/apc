var express = require('express');
var path    = require('path');
var router  = express.Router();
var controllers = require(path.join(global.config.root, 'app/controllers'));

/* GET users listing. */
router.get('/', controllers.users.loginForm);
router.get('/add', controllers.users.addUserForm);
router.get('/login', controllers.users.loginForm);

router.post('/', controllers.users.addUser)
router.post('/login', controllers.users.login);
router.get('/doctors', controllers.users.doctors);
router.get('/patients', controllers.users.patients);
module.exports = router;