var express = require('express');
var router = express.Router();
var {insertUser, login, loginfb} = require('../controllers/user')

/* GET users listing. */
router.post('/register', insertUser)
      .post('/login', login)
      .post('/loginfb', loginfb)
      

module.exports = router;
