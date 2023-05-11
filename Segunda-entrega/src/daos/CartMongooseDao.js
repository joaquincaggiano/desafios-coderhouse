import cartSchema from "../models/cartSchema.js";

class CartMongooseDao {
  async getAllCarts() {
    const cartDocument = await cartSchema.find();
    
    return cartDocument;
  }

  async getCart(id) {
    const cartDocument = await cartSchema.findOne({ _id: id }).populate("products._id");

    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }

  async createCart(data) {
    const cartDocument = await cartSchema.create(data);
    return {
      id: cartDocument._id,
      products: cartDocument.products.map((product) => {
        return {
          product: product.id,
          quantity: product.quantity,
        }
      })
    };
  }

  async addProductToCart(cartId, productId) {
    let document = await cartSchema.findOneAndUpdate(
      { _id: cartId, "products._id": productId },
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    );

    if (!document) {
      document = await cartSchema.findOneAndUpdate(
        { _id: cartId },
        { $push: { products: { _id: productId, quantity: 1 } } },
        { new: true }
      );
    }

    if (!document) return null;

    return {
      id: document._id,
      products: document.products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
      })),
    };
  }

  async deleteProductFromCart(id, data) {
    const cartDocument = await cartSchema.updateOne({_id: id}, {$set: {"products": data}});
    return {
      id: cartDocument._id,
      products: cartDocument.products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
      })),
    };
  }

  async updateProductFromCart(id, data) {
    const cartDocument = await cartSchema.updateOne({_id: id}, {$set: {"products": data}});

    return {
      id: cartDocument._id,
      products: cartDocument.products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
      })),
    };
  }

  async deleteAllProductsFromCart(id, data) {
    const cartDocument = await cartSchema.updateOne({_id: id}, {$set: {"products": data}});

    return {
      id: cartDocument._id,
      products: cartDocument.products,
    };
  }
}

export default CartMongooseDao;
