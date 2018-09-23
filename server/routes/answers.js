var router = require('express').Router()
var {createAs, getAs, getAsQs} = require('../controllers/answer');
var isLogin = require('../middlewares/isLogin');


router.post('/', isLogin, createAs)
      .get('/', getAsQs )
      .get('/all', getAs )
    //   .get('/asqs', )

module.exports = router