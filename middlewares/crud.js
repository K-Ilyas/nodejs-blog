const Blog = require("../models/blog");


function get_blogs(done) {

    Blog.find({})
        .sort({ createdAt: -1 })
        .then(blogs => done(null, blogs))
        .catch(error => done(error))

}

function create_blog(properties, done) {
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
        .then(blog => done(null, blog))
        .catch(error => done(error))

}


exports.get_blogs = get_blogs;
exports.create_blog = create_blog;
exports.get_blog = get_blog;
exports.delete_blog = delete_blog;