var router = require('express').Router()
var {createQs, getQs, getOneQs, getUserQs, update, deleteQs, upVote, downVote} = require('../controllers/question');
var isLogin = require('../middlewares/isLogin');

router.post('/', isLogin, createQs)
      .get('/myquestions', isLogin, getUserQs)
      .get('/', getQs)
      .get('/:id', getOneQs)
      .put('/:id', isLogin, update)
      .put('/:id/upvote', isLogin, upVote)
      .put('/:id/downvote', isLogin, downVote)
      .delete('/:id', isLogin, deleteQs)
module.exports = router