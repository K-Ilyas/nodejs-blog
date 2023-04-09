const express = require("express");
const app = express();
const path = require("path");
const { routes } = require("./routes/api")
const main = require("./connexion")
// config .emv
require("dotenv").config();





const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');


// databse

main((myDatabse) => {
    routes(app, port, myDatabse)
})

app.use(express.static(path.join(__dirname, "public")));






module.exports = app