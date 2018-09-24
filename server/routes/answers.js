var router = require('express').Router()
var {createAs, getAs, getAsQs, updateAs, upVoteAs, downVoteAs} = require('../controllers/answer');
var isLogin = require('../middlewares/isLogin');


router.post('/', isLogin, createAs)
      .get('/', getAsQs )
      .get('/all', getAs )
      .put('/:id', isLogin, updateAs )
      .put('/:id/upvote', isLogin, upVoteAs)
      .put('/:id/downvote', isLogin, downVoteAs)
module.exports = router