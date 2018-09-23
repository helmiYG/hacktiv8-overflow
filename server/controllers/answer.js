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
        Answer.find({ questionId: req.body.questionId })
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
        Answer.updateOne({ questionId: req.body.questionId }, { $set: { answer: req.body.answer } })
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
    }
};
