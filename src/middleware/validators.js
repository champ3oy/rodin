import Joi from "joi";

const endpointSchema = Joi.object({
  url: Joi.string().uri().required(),
  name: Joi.string().required(),
  interval: Joi.number().min(30).max(3600).default(60),
  active: Joi.boolean(),
  type: Joi.string().valid('service', 'website').required()
});

export const validateEndpoint = (req, res, next) => {
  const { error } = endpointSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateAuth = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
