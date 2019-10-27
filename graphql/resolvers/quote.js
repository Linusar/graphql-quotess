import Joi from "joi";

import { Quote } from "../../models/models";
import validators from "../validators/validators";

export default {
  Query: {
    // TODO: projection, pagination, sanitization
    quotes: (root, args, context, info) => Quote.find({}),
    quote: async (root, args, context, info) => {
      // TODO: projection
      await Joi.validate(args, validators.quote.findQuote);

      return Quote.findById(args.id);
    },
    limitQuote: async (root, args, context, info) => {
      return Quote.find({}).limit(args.limit);
    }
  },
  Mutation: {
    createQuote: async (root, args, context, info) => {
      await Joi.validate(args, validators.quote.createQuote, {
        abortEarly: false
      });

      const quote = await Quote.create(args);

      return quote;
    },
    modifyQuote: async (root, args, context, info) => {
      const res = await Quote.updateOne(
        { _id: args.quoteId },
        {
          author: args.authoer,
          photo: args.photo,
          quote: args.quote,
          likes: args.likes,
          reference: args.reference,
          categorie: args.categorie,
          aprobed: args.aprobed
        }
      );

      return !!res.nModified > 0;
    },
    deletedQuote: async (root, args, context, info) => {
      const res = await Quote.findByIdAndRemove(args.quoteId, {
        useFindAndModify: false
      });

      return !!res.nDeleted > 0;
    }
  }
};
