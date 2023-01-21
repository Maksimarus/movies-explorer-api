import { celebrate, Joi } from 'celebrate';
// eslint-disable-next-line no-useless-escape
export const regExpForLink = /(http|https):\/\/(www)?[a-zA-Z0-9-\.]+\.[a-zA-Z]{2,6}?[a-zA-Z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*#?/;

export const idValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

export const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const registerValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

export const userValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

export const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExpForLink).messages({
      'string.pattern.base': 'Укажите ссылку',
    }),
    trailer: Joi.string().required().pattern(regExpForLink).messages({
      'string.pattern.base': 'Укажите ссылку',
    }),
    thumbnail: Joi.string().required().pattern(regExpForLink).messages({
      'string.pattern.base': 'Укажите ссылку',
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});
