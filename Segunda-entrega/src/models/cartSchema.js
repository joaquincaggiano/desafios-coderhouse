import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const CartSchema = new Schema({
  products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: "products",
      },
      quantity: { type: Schema.Types.Number },
    },
  ],
});

export default mongoose.model(cartCollection, CartSchema);