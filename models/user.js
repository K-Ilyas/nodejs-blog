const { Schema, model } = require("mongoose")


const User = Schema({
    name: {
        type: String,
        required: true,
        unique: true // `name` must be unique
    },
    email: {
        type: String,
        required: true,
        unique: true // `email` must be unique
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    background_image: {
        type: String,
        default: ""
    }

}, { timestamps: true })

module.exports = model("User", User)