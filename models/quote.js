import mongoose from "mongoose";

const { Schema, model } = mongoose;

const quoteSchema = new Schema(
  {
    author: {
      type: String,
      index: true,
      required: true
    },
    date: {
      type: Date
    },
    photo: { type: String },
    quote: { type: String, required: true },
    reference: { type: String },
    likes: { type: Number, default: 0 },
    categorie: { type: String, index: true, required: true },
    aprobed: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Quote = model("Quote", quoteSchema);

export default Quote;
