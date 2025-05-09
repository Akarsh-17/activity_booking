const express = require('express');
const dbConnect = require('./config/database')
const cors = require('cors');
const cookieParser=require('cookie-parser')
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/User')
const activityRoutes = require('./routes/activity')
const bookingRoutes = require('./routes/booking')


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dbConnect();
app.use('/api/user', userRoutes);
app.use("/api/activity", activityRoutes)
app.use("/api/booking", bookingRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});