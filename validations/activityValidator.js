const Joi = require("joi");

const createActivitySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
        'string.pattern.base': 'Date must be in YYYY-MM-DD format only.',
    }), //YYYY-MM-DD
    time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
        'string.pattern.base': 'Time must be in HH:MM format only.',
    }), //hh:mm
})

module.exports = {createActivitySchema};