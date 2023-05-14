const Blog = require("../models/blog");
const fs = require("fs")


function get_blogs(done) {

    Blog.find({})
        .sort({ createdAt: -1 })
        .then(blogs => done(null, blogs))
        .catch(error => done(error))

}

function create_blog(req, properties, done) {
    if (req.file && req.file.originalname)
        properties.image = "/images/" + req.file.filename
    else if (req.files) {
        if (req.files.image)
            properties.image = "/images/" + req.files.image[0].filename
        if (req.files.video)
            properties.video = "/videos/" + req.files.video[0].filename
    }

    const blog = new Blog(properties);
    console.log(blog)
    blog.save()
        .then(blog => done(null, blog))
        .catch(error => done(error))

}

function get_blog(id, done) {
    Blog.findById(id)
        .then(blog => done(null, blog))
        .catch(error => done(error))

}


function delete_blog(id, done) {
    Blog.findByIdAndDelete(id)
        .then(blog => {
            if (blog.image !== '') {
                const filepath = process.cwd() + "/public" + blog.image
                fs.unlink(filepath, (err) => {
                    if (err) throw err;
                    console.log(blog.image + ' was deleted');
                })
            }
            if (blog.video !== undefined) {
                const filepath = process.cwd() + "/public" + blog.video
                fs.unlink(filepath, (err) => {
                    if (err) throw err;
                    console.log(blog.video + ' was deleted');
                })
            }
            return done(null, blog)
        })
        .catch(error => done(error))

}


exports.get_blogs = get_blogs;
exports.create_blog = create_blog;
exports.get_blog = get_blog;
exports.delete_blog = delete_blog;