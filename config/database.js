const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL, {})
    .then(()=>console.log(" db connected"))
    .catch((error)=> {
        console.log("issue while connecting to db")
        console.log("db connect err",error);
        process.exit(1);
    })
}

module.exports = dbConnect