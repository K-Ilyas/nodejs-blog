const express = require("express");
const app = express();
const path = require("path");
const expressejslayouts = require("express-ejs-layouts")
const { blog, user } = require("./routes/api")
const main = require("./connexion")
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const { localAuth } = require("./middlewares/auth");

// config .emv
require("dotenv").config();

// create a session
app.use(session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        // Session expires after 1 min of inactivity.
        expires: 60000 * 30
    }
}));
// configure passport
app.use(passport.initialize());
app.use(passport.session());
// configure flash message
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(expressejslayouts);

// databse

main((myDatabse) => {
    blog(app)
    user(app)
    localAuth(passport)
    // listen to the requests
    app.use((req, res) => {
        res.render("404", { title: "Not Found" })
    })
    app.listen(port, () => {
        console.log("server is listening on port", port);
    })
})

app.use(express.static(path.join(__dirname, "public")));






module.exports = app