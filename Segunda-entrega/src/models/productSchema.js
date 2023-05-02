import mongoose, { Schema } from "mongoose";

const productCollection = 'products';

const ProductSchema = new Schema({
  title: { type: Schema.Types.String, require: true },
  description: { type: Schema.Types.String, require: true },
  price: { type: Schema.Types.Number, require: true },
  thumbnail: { type: Schema.Types.String, require: true },
  code: { type: Schema.Types.String, require: true },
  stock: { type: Schema.Types.Number, require: true },
});

export default mongoose.model(productCollection, ProductSchema);