const { get_blogs, create_blog, get_blog, delete_blog } = require("../middlewares/crud");
const { properties, param } = require("../controllers/blog")
const moment = require("moment")
const multer = require("multer")
const upload = require("../middlewares/fileUpload")

function routes(app, port) {
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
                    res.render("index", { title: "home", blogs })
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
                    console.log(blog)
                    res.redirect("/blogs");
                }
            })
        })

    app.get("/about", (req, res) => {
        res.render("about", { title: "about" })
    });

    app.get("/blogs/create", (req, res) => {
        res.render("create", { title: "create blog" })
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

    app.use((req, res) => {
        res.render("404", { title: "Not Found" })
    })

    app.listen(port, () => {
        console.log("server is listening on port", port);
    })

}


exports.routes = routes