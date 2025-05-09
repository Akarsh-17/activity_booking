const mongoose = require("mongoose");
const { type } = require("os");

const activitySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description: {
        type:String,
        require: true,
    },
    location: {
        type:String,
        require: true,
    },
    date: {
        type:Date,
        require: true,
        set: (val) => {
            const d = new Date(val);
            d.setUTCHours(0, 0, 0, 0);
            return d;
        }
    },
    time:{
        type:String,
        require: true,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("Activity", activitySchema);