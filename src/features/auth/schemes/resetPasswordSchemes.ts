import Joi, { ObjectSchema } from 'joi';

const resetPasswordScehma: ObjectSchema = Joi.object().keys({
  token: Joi.string().required().messages({
    'string.base': 'Token must be a string',
    'any.required': 'Token is required'
  }),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must be minimum 8 characters with one capital letter, one number, one symbol, and max 16 characters',
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required'
    })
});

export { resetPasswordScehma };
