const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

module.exports = {

    updateUser: (req, res) => {
        const userId = req.params.userId;
        const updates = req.body;

        User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }, (err, updatedUser) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found.' });
            }
            res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
        });
    },

    createUserWithGoogle: (req, res, next) => {
        passport.authenticate('google-signup', { session: false }, (err, user, info) => {
            if (!user) {
                return res.status(401).json({ error: 'Google authentication failed.' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({ message: 'Success! You are logged in.', user });
            });
        })(req, res, next);
    },

    loginUserWithGoogle: (req, res, next) => {
        passport.authenticate('google', (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!user) {
                return res.status(401).json({ error: 'Google authentication failed.' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                // Modify the success response to include the user object
                return res.status(200).json({ message: 'Success! You are logged in.', user });
            });
        })(req, res, next);
    },

    googleCallback: (req, res, next) => {
        passport.authenticate('google', (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!user) {
                return res.status(401).json({ error: 'Google authentication failed.' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                return res.redirect('/decks');
            });
        })(req, res, next);
    },

    loginUser: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            // console.log('login user controller - user: ', user)
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
                // Modify the success response to include the user object
                return res.status(200).json({ message: 'Success! You are logged in.', user });
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
            email: req.body.email,
            password: req.body.password,
        });

        User.findOne(
            {
                email: req.body.email,
            },
            (err, existingUser) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (existingUser) {
                    return res.status(409).json({ error: 'Account with that email address already exists.' });
                }
                user.save((err) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    req.logIn(user, (err) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        // return user object so that user can be automatically logegd in after signup
                        return res.status(201).json({ message: 'User account created successfully.', user });
                    });
                });
            });
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

