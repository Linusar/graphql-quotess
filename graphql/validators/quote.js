import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const author = Joi.string()
  .min(1)
  .max(255)
  .label("Author");

const photo = Joi.string()
  .min(5)
  .max(255)
  .label("Photo");

const quote = Joi.string()
  .min(5)
  .max(255)
  .required()
  .label("Quote");

const reference = Joi.string()
  .min(5)
  .max(255)
  .label("Reference");

const categorie = Joi.string()
  .min(5)
  .max(255)
  .label("Categorie");

const likes = Joi.number().label("Likes");

const aprobed = Joi.boolean().label("Aprobed");

export const findQuote = Joi.object().keys({
  id: Joi.objectId()
});

export const createQuote = Joi.object().keys({
  author,
  photo,
  quote,
  likes,
  reference,
  categorie,
  aprobed
});
