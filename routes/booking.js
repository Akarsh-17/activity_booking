const express = require('express');
const router = express.Router();


const {createBooking, getUserBooking} = require("../controller/Booking")
const {createBookingSchema} = require("../validations/bookingValidator")
const {auth} = require("../middleware/auth");
const {validate} = require("../middleware/validate")


router.post("/createBooking",auth,validate(createBookingSchema),createBooking);
router.get("/getUserBooking", auth,getUserBooking);

module.exports = router;