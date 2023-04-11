const { get_blogs, create_blog, get_blog } = require("../middlewares/crud");
const { properties, param } = require("../controllers/blog")


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
        .post(properties, (req, res) => {
            create_blog(req.body, (err, blog) => {
                if (err)
                    console.log(err)
                if (blog)
                    res.redirect("/blogs");
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
                if (blog)
                    res.render("details", { blog, title: "blog details" })
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