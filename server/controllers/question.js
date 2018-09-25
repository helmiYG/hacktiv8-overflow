const Question = require('../models/question');
// const bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// let jwt = require('jsonwebtoken');

module.exports = {
    createQs: (req, res) => {
        let { title, description } = req.body
        Question.create({
            title: title,
            description: description,
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

    getQs: (req, res) => {
        Question.find().populate('userId')
            .then((result) => {
                res.status(201).json(result)
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },

    getOneQs: (req, res) => {
        let id = req.params.id
        Question.findById(id)
            .then((result) => {
                res.status(201).json(result)
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },

    getUserQs: (req, res) => {
        Question.find({ userId: req.userLogin._id })
            .then((result) => {
                res.status(201).json(result)
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },

    update: (req, res) => {
        let id = req.params.id
        let { title, description } = req.body
        Question.findById(id)
            .then((question) => {
                if (question) {
                    if (String(question.userId) == String(req.userLogin._id)) {
                        Question.updateOne({ _id: id },
                            {
                                title: title,
                                description: description
                            }
                        )
                            .then((result) => {
                                res.status(201).json({
                                    msg: 'update succes',
                                    result
                                })

                            }).catch((err) => {
                                res.status(400).json({
                                    err: err.message
                                })
                            });
                    } else {
                        res.status(400).json({
                            msg: 'you are not authorized to update this question'
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: 'question not found'
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },

    deleteQs: (req, res) => {
        let id = req.params.id
        Question.findById(id)
            .then((question) => {
                if (question) {
                    if (String(question.userId) == String(req.userLogin._id)) {
                        Question.deleteOne({ _id: req.params.id })
                            .then((result) => {
                                res.status(201).json({
                                    msg: 'delete succes',
                                    result
                                })

                            }).catch((err) => {
                                res.status(400).json({
                                    err: err.message
                                })
                            });
                    } else {
                        res.status(400).json({
                            msg: 'you are not authorized to delete this question'
                        })
                    }
                } else {
                    res.status(400).json({
                        msg: 'question not found'
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });

    },

    upVote: (req, res) => {
        let id = req.params.id
        Question.findOne({ _id: id })
            .then((result) => {
                if (result) {
                    //apakah qs nya punya yg login
                    if (String(result.userId) == String(req.userLogin._id)) {
                        res.status(400).json({
                            msg: 'you cant upvote your own question'
                        })
                    } else {
                        let statusUpvote = true // cek apakah dia pernah downvote ?
                        result.dislike.forEach(dislikeEL => {
                            if (String(dislikeEL) == String(req.userLogin._id)) {
                                statusUpvote = false
                            }
                        });

                        if (statusUpvote) {
                            let status = true //apakh dia sudah ngvote sebelumnya?
                            result.like.forEach(element => {
                                if (String(element) == String(req.userLogin._id)) {
                                    status = false
                                }
                            });
                            if (status) {
                                Question.updateOne({ _id: req.params.id }, { $push: { like: req.userLogin._id } })
                                    .then((result) => {
                                        res.status(201).json({
                                            msg: 'upvote succes',
                                            result
                                        })

                                    }).catch((err) => {
                                        res.status(400).json({
                                            err: err.message
                                        })
                                    });

                            } else {
                                res.status(400).json({
                                    msg: 'you cant upvote twice'
                                })
                            }
                        } else {
                            res.status(400).json({
                                msg: 'you cant upvote and downvote in the same question'
                            })
                        }
                    }
                } else {
                    res.status(400).json({
                        msg: 'question not found'
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },


    downVote: (req, res) => {
        let id = req.params.id
        Question.findOne({ _id: id })
            .then((result) => {
                if (result) {
                    if (String(result.userId) == String(req.userLogin._id)) {
                        res.status(400).json({
                            msg: 'you cant downvote your own question'
                        })
                    } else {
                        let statusdownVote = true // cek apakah dia pernah upvote ?
                        result.like.forEach(likeEL => {
                            if (String(likeEL) == String(req.userLogin._id)) {
                                statusdownVote = false
                            }
                        });

                        if (statusdownVote) {
                            let status = true //apakh dia sudah ngvote sebelumnya?
                            result.dislike.forEach(element => {
                                if (String(element) == String(req.userLogin._id)) {
                                    status = false
                                }
                            });
                            if (status) {
                                Question.updateOne({ _id: req.params.id }, { $push: { dislike: req.userLogin._id } })
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

                            } else {
                                res.status(400).json({
                                    msg: 'you cant downvote twice'
                                })
                            }
                        } else {
                            res.status(400).json({
                                msg: 'you cant upvote and downvote in the same question'
                            })
                        }
                    }
                } else {
                    res.status(400).json({
                        msg: 'question not found'
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    err: err.message
                })
            });
    },
};
