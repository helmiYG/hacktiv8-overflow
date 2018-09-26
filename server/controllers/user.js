const User = require('../models/user');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
let jwt = require('jsonwebtoken');
var axios = require('axios');

module.exports = {
    insertUser:(req, res)=>{
        const {name, email, password} = req.body
        var hash = bcrypt.hashSync(password, salt);
        User.create({
            name: name,
            email : email,
            password: hash
        })
        .then((result) => {
            if (result) {
                res.status(201).json({
                    result,
                    msg: 'register succes'
                })
            } else {
                res.status(400).json({
                    msg :'email duplicated',
                    err
                })
            }
          
        })
        .catch((err) => {
            res.status(400).json({
                msg :'email duplicated',
                err
            })
        });
    },

    login: (req, res) => {
        const {email, password} = req.body
        User.findOne({email: email})
        .then((result) => {
            if(result){
                let decrypted = bcrypt.compareSync(password, result.password);
                if (decrypted) {
                    let token = jwt.sign({
                        email: result.email,
                        name: result.name,
                        id: result._id
                    }, process.env.secret)

                    res.status(200).json({
                        msg: 'succes login',
                        token,
                        id: result._id
                    })
                } else {
                    res.status(400).json({
                        msg: 'password wrong'
                    })
                }
            } else {
                res.status(400).json({
                    msg: 'user not found'
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                msg: err.message
            })
        });
    },

    loginfb: (req, res) => {
       
        let token = req.body.token
        let user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        axios.get(user_info)
        .then((result) => {
           User.findOne({email : result.data.email})
            .then((user) => {
               if(user){
                    let token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    },process.env.secret)
                    
                    res.status(200).json({
                       msg: 'login succes',
                       token,
                       id: user._id
                   })
                }else{
                    var hash = bcrypt.hashSync(result.data.email, salt); 
                    User.create({
                        name: result.data.name,
                        email: result.data.email,
                        password: hash,
                    })
                    .then((newUser) => {
                        let token = jwt.sign({
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email
                        },process.env.secret)

                        res.status(200).json({
                            msg: 'login succes',
                            token,
                            id: newUser._id
                        })

                    })
                    .catch((err) => {
                        res.status(500).json({
                            msg: err.message
                        })
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: err.message
            })
        });
    },


    loginGoogle: (req, res) => {
        User.findOne({email: req.body.email})
        .then((user) => {
            if (user) {
                let token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                },process.env.secret)
                res.status(200).json({
                   msg: 'login succes',
                   token,
                   id: user._id
               })  
            } else {
                var hash = bcrypt.hashSync(req.body.email, salt); 
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                })
                .then((newUser) => {
                    let token = jwt.sign({
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email
                    },process.env.secret)

                    res.status(200).json({
                        msg: 'login succes',
                        token,
                        id: newUser._id
                    })

                })
                .catch((err) => {
                    res.status(500).json({
                        msg: err.message
                    })
                });
            }
        }).catch((err) => {
            res.status(500).json({
                msg: err.message
            })
        });
    }
};