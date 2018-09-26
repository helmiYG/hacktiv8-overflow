var kue = require('kue')
var queue = kue.createQueue();
var CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
require('dotenv').config()
console.log('masuk send');

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'helmiyghacktiv8@gmail.com', 
            pass: process.env.password, 
        }
    });

    new CronJob('1 * * * * *', function() {
        let job = queue.process('email', function(job, done){
            console.log(job);
            
            sendMail(job.data, done);
          });
      }, null, true, 'Asia/Jakarta');

    function sendMail(mailOptions, done) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            done()
        });
    }
// });