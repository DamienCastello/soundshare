const jwt = require('jsonwebtoken');
const User = require('../models').User;
const bcrypt = require('bcrypt');

const requestIP = require('request-ip');


//////////////////////////////
// WORK IN PROGRESS ON LOGIN
//////////////////////////////
module.exports = {
    signInUser: async function (req, res, next) {
        await User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user === null) {
                    console.log('Not found!');
                } else {
                    bcrypt.compare(req.body.password, user.password, function (error, response) {
                        if (error) {
                            // handle error
                            console.log("error on compare:", error)
                        }
                        if (response !== true) {
                           console.log('Bad Password!');
                           return res.status(400).json({ success: false, message: 'password doesn\'t match' });
                        }
                        if (response) {
                            //Signin jwt with your SECRET key 
                            const token = jwt.sign(user.dataValues, 'supersecretpassw0rd');
                            //Return user and token in json response 

                            res.json({ user, token });
                        } else {
                            // response is OutgoingMessage object that server response http request
                            return res.json({ success: false, message: 'password doesn\'t match' });
                        }
                    });
                }
            })
            .catch((err) => { console.log("error on findUser", err) })

    },
    signUpUser: function (req, res, next) {
        const ipAddress = requestIP.getClientIp(req);
        const obj = JSON.parse(JSON.stringify(req.body));

        var isMusicProducer = false;
        if(req.body.isArtist === 'true') {
            isMusicProducer = true
        }
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                console.log("check file", req.file ? `${ipAddress}/${req.file.path}` : null)
        User.create({
            email: req.body.email,
            password: hash,
            name: req.body.name,
            avatar: req.file ? `${ipAddress}/${req.file.path}` : null,
            isAdmin: req.body.isAdmin || false,
            isArtist: isMusicProducer,
        })
            .then((newUser) => {
                const userDatas = {
                    id: newUser.id,
                    email: newUser.email,
                    password: newUser.password,
                    name: newUser.name,
                    avatar: newUser.avatar,
                    isAdmin: newUser.isAdmin,
                    isArtist: newUser.isArtist,
                };

                //TODO: NOTIF mailer
                const token = jwt.sign(userDatas, 'supersecretpassw0rd');
                /* Return user and token in json response */
                res.json({ user: userDatas, token });
            })
            .catch((error) => {
                console.log(error.message);
                res.status(500).json({ message: error.message, error });
            });
            });
        });
        
        
    },



    //not incorporate yet
    /*
    deleteAccount: function (req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user) {
                    user.destroy()
                        .then((deletedUser) => { res.json({ user: deletedUser }); })
                        .catch((error) => { res.status(500).json({ error }); });
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            })
            .catch((error) => { res.status(500).json({ error }); });
    },
    changePassword: function (req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user) {
                    bcrypt.compare(req.body.oldPassword, user.dataValues.password, function (err, result) {
                        if (result) {
                            user.update({ password: req.body.password })
                                .then((updatedUser) => { res.json({ user: updatedUser }); })
                                .catch((error) => { res.status(500).json({ error }); });
                        } else {
                            res.status(401).json({ message: 'Invalid password' });
                        }
                    });
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            })
            .catch((error) => { res.status(500).json({ error }); });
    },
    forgetPassword: function (req, res, next) {
        const generatePassword = () => {
            let char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            let password = '';
            for (let i = 0; i < 10; i++) {
                const randomChar = char[Math.floor(Math.random() * char.length)];
                password += randomChar;
            }
            return password;
        };

        //Verify if user exists in db
        //Todo add email as query parameter
        //TODO Use other function than findAll to get only one result
        User.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (!user) {
                    return res.status(500).json({ message: 'Email introuvable merci de verifier' });
                }

                //Randomly generate a new password
                //Encrypt new password (bcrypt)
                //TODO Use other function than findAll to get only one result    
                const password = generatePassword();
                user.update({
                    password
                })
                    .then((updatedUser) => {
                        const userDatas = {
                            id: user.id,
                            password: password //in email sends we return new password not encrypted
                        };

                        //mailer(userDatas, user.email, 'resetPassword');
                        res.json({ updatedUser });
                    })
                    .catch((error) => {
                        res.status(500).json({ error });
                    });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }
    */
};
