const User = require('../modals/User')
const Booking = require('../modals/Booking');
const Activity = require('../modals/Activity');

exports.createBooking = async (req,res) => {
    try {
        const {activityId , confirm} = req.body;

        const userId = req.user.id;
        console.log("activity", activityId);
        console.log("user", userId);
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        const userDetails = await User.findById(userId);

        const allUserBookings = await Booking.find({ user: userId }).populate('activity');
        console.log(allUserBookings);
        console.log(new Date(activity.date));
        console.log(activity.time);
        const conflictBooking = allUserBookings.find((booking) => {
            // console.log( booking.activity._id.toString() === activityId.toString(),
            // new Date(booking.activity.date).toISOString() === new Date(activity.date).toISOString() ,
            // booking.activity.time === activity.time,
            // new Date(booking.activity.date))
            return (
                // booking.activity._id.toString() === activityId.toString() &&
                new Date(booking.activity.date).toISOString() === new Date(activity.date).toISOString() && 
                booking.activity.time === activity.time
            )
        })

        if(conflictBooking ) {
            console.log(conflictBooking)
            if(!confirm) {
                return res.status(409).json({
                    message: 'You already have a booking at this date/time. Add confirm=true to override.',
                    existingBookingId: conflictBooking._id
                });
            }
            const updatedBooking = await Booking.findByIdAndUpdate(
                conflictBooking._id,
                { activity: activity._id, date: activity.date, time: activity.time },
                { new: true }
              );
            return res.json({ message: 'Booking updated to new activity', booking: updatedBooking });
        }
        
        const booking = await Booking.create({
            user: userId,
            activity: activity._id,
            date: activity.date,
            time: activity.time
        });
        await User.findByIdAndUpdate(userId,
            {$push:{
                bookings:booking._id
            }},
            {new:true}
        )
        res.status(201).json(booking);

    } catch (error) {
        console.log(error)
        return res.status(500).json({
          success:false,
          message:'could not  make a booking/ internal error'
        })
    }
}

exports.getUserBooking = async(req,res) => {
    try{
        const userId = req.user.id;
        const bookings = await User.findById(userId)
        .populate({
            path: 'bookings',
            populate: {
              path: 'activity',
              model: 'Activity'
            }
          })
        return res.status(200).json(bookings);
    } catch( error) {
        console.log(error)
        return res.status(500).json({
          success:false,
          message:'could not  get user booking/ internal error'
        })
    }
}