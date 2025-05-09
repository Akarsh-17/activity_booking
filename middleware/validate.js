exports.validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        // Send all validation errors back to client
        return res.status(400).send(error.details[0].message);
      }
      next();
    };
}