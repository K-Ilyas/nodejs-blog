const mongoose = require('mongoose');
require("dotenv").config();

const uri = process.env.MONGO_URI;


async function main(callback) {

    try {
        const client = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await callback(client);
        console.log("database connected");
    }
    catch (e) {
        console.log(e);
        throw new Error("unable to connect to database.");
    }

}



module.exports = main
