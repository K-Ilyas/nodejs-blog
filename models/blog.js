const { Schema, model } = require("mongoose");


const Blog = Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }

}, { timestamps: true })


module.exports = model("Blog", Blog)