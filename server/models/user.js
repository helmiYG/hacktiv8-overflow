var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {newUser} = require('../helpers/template');
var kue = require('kue')
  , queue = kue.createQueue();

let userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {
    timestamps: true
})

userSchema.post('save', function() {
    let job = queue.create('email', {
        subject: `Thank you for register, ${this.name}`,
        title: 'welcome to hacktiv8 overflow',
        from: 'helmiyghacktiv8@gmail.com',
        to: this.email,
        html: newUser(this.name),
        text: 'congratulations, you have join our comunity'
    }).save( function(err){
       if( !err ) {
          console.log('ini job id', job.id );
       } 
    });
})

let User = mongoose.model('User', userSchema)

module.exports = User