import cartSchema from "../models/cartSchema.js";

class CartMongooseDao {
  async getCart(id) {
    const cartDocument = await cartSchema.findOne({ _id: id });

    return cartDocument;
  }

  async createCart(data) {
    const cartDocument = await cartSchema.create(data);
    return cartDocument;
  }

  async addProductToCart(id, data) {
    const cartDocument = await cartSchema.updateOne({_id: id}, {$set: {"products": data}},);

    return cartDocument;
  }

  async deleteProductFromCart(id, data) {
    const cartDocument = await cartSchema.updateOne({_id: id}, {$set: {"products": data}});
    return cartDocument;
  }

  async updateProductFromCart(id, data) {
    const cartDocument = await cartSchema.updateOne({_id: id}, {$set: {"products": data}});
    return cartDocument;
  }

  async deleteAllProductsFromCart(id, data) {
    const cartDocument = await cartSchema.updateOne({_id: id}, {$set: {"products": data}});
    return cartDocument;
  }
}

export default CartMongooseDao;
