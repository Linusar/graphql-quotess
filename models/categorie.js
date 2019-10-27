import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorieSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      index: true,
      required: true
    },
    aprobed: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Categorie = model("Categorie", categorieSchema);

export default Categorie;
