const Joi = require("joi");

const createBookingSchema = Joi.object({
    activityId: Joi.string().hex().length(24).required(),
    confirm: Joi.boolean().optional(),
})

module.exports = {createBookingSchema};
