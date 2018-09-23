var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let qsSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    like: [],
    dislike: []
})

let Question = mongoose.model('Question', qsSchema)

module.exports = Question