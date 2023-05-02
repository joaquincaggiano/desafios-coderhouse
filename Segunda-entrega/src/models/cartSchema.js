import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const CartSchema = new Schema({
  products: { type: Schema.Types.Array, default: [] },
});

export default mongoose.model(cartCollection, CartSchema);