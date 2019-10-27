import Joi from "joi";

import { Categorie } from "../../models/models";
import validators from "../validators/validators";

export default {
  Query: {
    // TODO: projection, pagination, sanitization
    categories: (root, args, context, info) => Categorie.find({}),
    categorie: async (root, args, context, info) => {
      // TODO: projection
      await Joi.validate(args, validators.categorie.findCategorie);

      return Categorie.findById(args.id);
    }
  },
  Mutation: {
    createCategorie: async (root, args, context, info) => {
      await Joi.validate(args, validators.categorie.createCategorie, {
        abortEarly: false
      });

      const categorie = await Categorie.create(args);

      return categorie;
    }
  }
};
