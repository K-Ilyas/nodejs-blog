const { Schema, model } = require("mongoose");


const Blog = Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },

}, { timestamps: true })


module.exports = model("Blog", Blog)