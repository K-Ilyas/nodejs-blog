const { get_blogs, create_blog, get_blog, delete_blog } = require("../middlewares/crud");
const { properties, param } = require("../controllers/blog")
const moment = require("moment")
const multer = require("multer")
const upload = require("../middlewares/fileUpload");
const { register, login } = require("../controllers/auth");
const { create_user } = require("../middlewares/user");
const passport = require("passport");
const emailVaidation = require("../middlewares/email");
const { ensureNotAuthenticated } = require("../middlewares/auth");

require("dotenv").config()

function blog(app) {
    app.use((req, res, next) => {
        console.log("your request has been successfully received");
        next();
    });

    app.get("/", (req, res) => {
        res.redirect("/blogs")
    });

    app.route("/blogs")
        .get((req, res) => {
            get_blogs((err, blogs) => {
                if (err)
                    res.render("index", { title: "home", "blogs": [] })
                if (blogs)
                    res.render("index", { title: "home", blogs, user: req.user })
            })
        })
        .post((req, res, next) => {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    req.error = err
                } else if (err) {
                    // An unknown error occurred when uploading.
                    req.error = err
                }
                console.log(req.body)
                next()
                // Everything went fine.
            })
        }, properties, (req, res) => {
            create_blog(req, req.body, (err, blog) => {
                if (err)
                    console.log(err)
                if (blog) {
                    res.redirect(`/blog/${blog._id}`);
                }
            })
        })

    app.get("/about", (req, res) => {
        res.render("about", { title: "about" })
    });

    app.get("/blogs/create", (req, res) => {
        res.render("create", { title: "create blog", key: process.env.iframe })
    });

    app.route("/blog/:id")
        .get(param, (req, res) => {
            get_blog(req.params.id, (err, blog) => {
                if (err)
                    console.log(err)
                if (blog) {
                    res.render("details", { blog, 'createdAt': moment(blog.createdAt).format("YYYY-MM-DD HH:mm:ss"), title: "blog details" })
                }
            })
        })
        .delete(param, (req, res) => {
            delete_blog(req.params.id, (err, blog) => {
                if (err)
                    console.log(err)
                if (blog) {
                    res.json({ redirect: "/" })
                }
            })
        })


}




function user(app) {
    app.route("/login")
        .get(ensureNotAuthenticated, (req, res) => {
            res.render("users/login", { title: "login page" })
        })
        .post(login, (req, res, next) => {
            passport.authenticate('local', {
                successRedirect: '/blogs',
                failureRedirect: '/login',
                failureFlash: true,
            })(req, res, next);
        })
    app.route("/register")
        .get(ensureNotAuthenticated, (req, res) => {
            res.render("users/register", { title: "register page" })
        })
        .post(register, emailVaidation, (req, res) => {
            create_user(req.body, (err, user) => {
                if (err) {
                    console.log(err);
                    res.render("users/register", { ...err, title: "register page" })
                }
                if (user) {
                    req.flash('success_msg', 'You have now registered!')
                    res.redirect("/login")
                }
            })
        })

}


exports.blog = blog
exports.user = user