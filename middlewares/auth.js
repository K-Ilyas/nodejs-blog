const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../models/user");

exports.localAuth = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email', // define the parameter in req.body that passport can use as username and password
            passwordField: 'password'
        }, (email, password, done) => {
            //match user
            User.findOne({
                $or: [
                    { 'email': email },
                    { 'name': email }
                ]
            })
                .then((user) => {

                    console.log(user);
                    if (!user) {
                        return done(null, false, { message: 'that email is not registered' });
                    }
                    //match pass
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'pass incorrect' });
                        }
                    })
                })
                .catch((err) => { console.log(err) })
        })

    )
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(user => done(null, user))
            .catch(error => done(error, null))
    });
};



exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'please login to view this resource');
    res.redirect('/login');
}

exports.ensureNotAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}