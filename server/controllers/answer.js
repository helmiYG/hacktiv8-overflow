const Answer = require('../models/answer');

module.exports = {
    createAs: (req, res) => {
        Answer.create({
            answer: req.body.answer,
            questionId: req.body.questionId,
            userId: req.userLogin._id
        })
            .then((result) => {
                res.status(201).json({
                    msg: 'create succes',
                    result
                })
            })
            .catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },

    getAs: (req, res) => {
        Answer.find()
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },

    getAsQs: (req, res) => {
        Answer.find({ questionId: req.params.idQ}).populate('userId')
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },

    updateAs: (req, res) => {
        let idAnswer = req.params.id
        Answer.findOne({ questionId: req.body.questionId })
            .then((result) => {
                if (result) {
                    if (String(result.userId) == String(req.userLogin._id)) {
                        Answer.updateOne({ _id: idAnswer }, { $set: { answer: req.body.answer } })
                            .then((updated) => {
                                res.status(201).json({
                                    msg: 'update succes',
                                    updated
                                })
                            }).catch((err) => {
                                res.status(400).json({
                                    err: err.message
                                })
                            });
                    } else {
                        res.status(400).json({
                            msg: 'you are not authorized to update this answer'
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: 'answer not found'
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
        // Answer.updateOne({ questionId: req.body.questionId }, { $set: { answer: req.body.answer } })
        //     .then((result) => {
        //         res.status(201).json({
        //             msg: 'update succes',
        //             result
        //         })

        //     }).catch((err) => {
        //         res.status(400).json({
        //             err: err.message
        //         })
        //     });
    },

    upVoteAs: (req, res) => {
        console.log(req.params.id);
        console.log(req.body.questionId);
        
        Answer.findOne({ questionId: req.body.questionId, _id: req.params.id })
            .then((result) => {
                if (result) {
                    if (String(result.userId) == String(req.userLogin._id)) {
                        res.status(400).json({
                            msg: 'you cant upvote your own answer'
                        })
                    } else {
                        let everDownvote = false
                        result.dislike.forEach(element => {
                            if (String(element) == String(req.userLogin._id)) {
                                everDownvote = true
                            }
                        });

                        //apakah dia udah pernah downvote
                        if (everDownvote) {
                            res.status(400).json({
                                msg: 'you cant upvote and downvote in the same question'
                            })
                        } else {
                            //apakh dia udah pernah upvote
                            let everUpVote = false
                            result.like.forEach(element => {
                                if (String(element) == String(req.userLogin._id)) {
                                    everUpVote = true
                                }
                            });

                            if (everUpVote) {
                                res.status(400).json({
                                    msg: 'you can upvote just once'
                                })
                            } else {
                                Answer.updateOne({ questionId: req.body.questionId, _id: req.params.id }, { $push: { like: req.userLogin._id } })
                                    .then((result) => {
                                        res.status(201).json({
                                            msg: 'upvote answer succes',
                                            result
                                        })

                                    }).catch((err) => {
                                        res.status(400).json({
                                            err: err.message
                                        })
                                    });
                            }
                        }
                    }
                } else {
                    res.status(400).json({
                        msg: 'answer not found'
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },

    downVoteAs: (req, res) => {
        Answer.findOne({ questionId: req.body.questionId, _id: req.params.id })
            .then((result) => {
                if (result) {
                    if (String(result.userId) == String(req.userLogin._id)) {
                        res.status(400).json({
                            msg: 'you cant downvote your own answer'
                        })
                    } else {
                        let everUpvote = false
                        result.like.forEach(element => {
                            if (String(element) == String(req.userLogin._id)) {
                                everUpvote = true
                            }
                        });

                        //apakah dia udah pernah downvote
                        if (everUpvote) {
                            res.status(400).json({
                                msg: 'you cant upvote and downvote in the same question'
                            })
                        } else {
                            //apakh dia udah pernah downvote
                            let everDownVote = false
                            result.like.forEach(element => {
                                if (String(element) == String(req.userLogin._id)) {
                                    everDownVote = true
                                }
                            });

                            if (everDownVote) {
                                res.status(400).json({
                                    msg: 'you can downvote just once'
                                })
                            } else {
                                Answer.updateOne({ questionId: req.body.questionId, _id: req.params.id }, { $push: { dislike: req.userLogin._id } })
                                    .then((result) => {
                                        res.status(201).json({
                                            msg: 'downvote succes',
                                            result
                                        })

                                    }).catch((err) => {
                                        res.status(400).json({
                                            err: err.message
                                        })
                                    });
                            }
                        }
                    }
                } else {
                    res.status(400).json({
                        msg: 'answer not found'
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    }
};
