import Joi, { ObjectSchema } from 'joi';

const activateAccountSchema: ObjectSchema = Joi.object().keys({
  token: Joi.string().required().messages({
    'string.base': 'Token must be a string',
    'string.empty': 'Token is required'
  })
});

export { activateAccountSchema };
