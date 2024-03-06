import Joi, { ObjectSchema } from 'joi';

const registerSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string()
    .regex(/^[a-zA-Z][a-zA-Z0-9]{5,9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Username must start with a letter and contain 6 to 10 characters with no symbols',
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required'
    }),
  email: Joi.string().email().required().messages({
    'string.base': 'Field must be valid',
    'string.required': 'Field must be valid',
    'string.email': 'Field must be valid'
  }),
  firstName: Joi.string().required().messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name is required'
  }),
  lastName: Joi.string().required().messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name is required'
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

export { registerSchema };
