import Joi from 'joi';

const endpointSchema = Joi.object({
  url: Joi.string().uri().required(),
  name: Joi.string().required(),
  interval: Joi.number().min(30).max(3600).default(60)
});

export function validateEndpoint(req, res, next) {
  const { error } = endpointSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  next();
}