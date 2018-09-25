var router = require('express').Router()
var {createAs, getAs, getAsQs, updateAs, upVoteAs, downVoteAs} = require('../controllers/answer');
var isLogin = require('../middlewares/isLogin');


router.post('/', isLogin, createAs)
      .get('/:idQ', getAsQs )
      .get('/all', getAs )
      .get('/:idQ/answer/:idAs', get)
      .put('/:id', isLogin, updateAs )
      .put('/:id/upvote', isLogin, upVoteAs)
      .put('/:id/downvote', isLogin, downVoteAs)
module.exports = router