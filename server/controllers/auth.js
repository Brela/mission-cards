const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

module.exports = {

    loginUser: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                return res.status(200).json({ message: 'Success! You are logged in.' });
            });
        })(req, res, next);
    },

    createUser: (req, res, next) => {
        console.log('made it here')
        const validationErrors = [];
        if (!validator.isEmail(req.body.email))
            validationErrors.push({ msg: 'Please enter a valid email address.' });
        if (validator.isEmpty(req.body.password))
            validationErrors.push({ msg: 'Password cannot be blank.' });

        if (validationErrors.length) {
            return res.status(400).json({ errors: validationErrors });
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        });

        User.findOne(
            {
                $or: [{ email: req.body.email }, { userName: req.body.userName }],
            },
            (err, existingUser) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (existingUser) {
                    return res.status(409).json({ error: 'Account with that email address or username already exists.' });
                }
                user.save((err) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    req.logIn(user, (err) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        return res.status(201).json({ message: 'User account created successfully.' });
                    });
                });
            }
        );
    },

    logoutUser: (req, res) => {
        req.logout(function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: 'Unable to logout' });
            }

            res.status(200).send({ message: 'Logged out successfully' });
        });
    },

};
