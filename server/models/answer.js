var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let answerSchema = new Schema({
    answer: {type: String, required: true},
    questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    like: [],
    dislike: []
}, {
    timestamps: true
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer