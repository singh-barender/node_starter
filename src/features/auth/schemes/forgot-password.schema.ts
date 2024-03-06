import Joi, { ObjectSchema } from 'joi';

const forgotPasswordScehma: ObjectSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'string.base': 'Field must be valid',
    'string.required': 'Field must be valid',
    'string.email': 'Field must be valid'
  })
});

export { forgotPasswordScehma };
