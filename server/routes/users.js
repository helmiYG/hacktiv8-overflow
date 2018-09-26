var express = require('express');
var router = express.Router();
var {insertUser, login, loginfb, loginGoogle} = require('../controllers/user')

/* GET users listing. */
router.post('/register', insertUser)
      .post('/login', login)
      .post('/loginfb', loginfb)
      .post('/google', loginGoogle)

module.exports = router;
