import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const name = Joi.string()
  .min(1)
  .max(255)
  .alphanum()
  .required()
  .label("Name");

const aprobed = Joi.boolean().label("Aprobed");

export const findCategorie = Joi.object().keys({
  id: Joi.objectId()
});

export const createCategorie = Joi.object().keys({
  name,
  aprobed
});
