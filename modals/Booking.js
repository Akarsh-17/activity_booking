const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

    activity : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
        require: true,
    },
    bookingAt: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        require: true,

    },
    time: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model("Booking", bookingSchema);