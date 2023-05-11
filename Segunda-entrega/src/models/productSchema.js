import mongoose, { Schema } from "mongoose";
// import paginate from "mongoose-paginate-v2";

const productCollection = 'products';

const ProductSchema = new Schema({
  title: { type: Schema.Types.String, require: true },
  description: { type: Schema.Types.String, require: true },
  price: { type: Schema.Types.Number, require: true },
  thumbnail: { type: Schema.Types.String, require: true },
  code: { type: Schema.Types.String, require: true },
  stock: { type: Schema.Types.Number, require: true },
  category: { type: Schema.Types.String, require: true },
  status: { type: Schema.Types.Boolean, default: true },
});

// ProductSchema.plugin(paginate);

export default mongoose.model(productCollection, ProductSchema);