import CartMongooseDao from "../daos/CartMongooseDao.js";
import ProductMongooseDao from "../daos/productMongooseDao.js";

class CartManager {
  constructor() {
    this.cartDao = new CartMongooseDao();
    this.productDao = new ProductMongooseDao();
  }

  async getAllCarts() {
    return this.cartDao.getAllCarts();
  }

  async getCart(id) {
    return this.cartDao.getCart(id);
  }

  async createCart(data) {
    try {
      return this.cartDao.createCart(data);
    } catch (error) {
      throw new Error("No se pudo crear el carrito");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.cartDao.getCart(cartId);

      if (!cart) {
        throw new Error("No existe ese carrito");
      }

      // const validProduct = await this.productDao.getOne(productId);

      // if (!validProduct) {
      //   throw new Error("El producto con ese Id no existe");
      // }

      const productCart = cart.products.find((product) => product?._id == productId);

    if (!productCart) {
      const validProduct = await this.productDao.getOne(productId);

      if (!validProduct) {
        throw new Error("El producto con ese Id no existe");
      }
      cart.products.push({ _id: productId, quantity: 1 });
    }

      // const productIndex = cart.products.findIndex(
      //   (product) => product._id == productId
      // );

      // productIndex != -1
      //   ? (cart.products[productIndex].quantity += 1)
      //   : cart.products.push({ _id: productId, quantity: 1 });

      await this.cartDao.addProductToCart(cartId, productId)

    } catch (error) {
      throw new Error("No se pudo agregar el producto al carrito");
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await this.cartDao.getCart(cartId);
      const productInDb = await this.productDao.getOne(productId);

      if(!cart || !productInDb) {
        throw new Error("No encontramos el carrito o producto con ese Id")
      }

      const productToDelete = cart.products.filter((product) => product.id != productInDb.id);

      await this.cartDao.deleteProductFromCart(cartId, productToDelete)

    } catch (error) {
      throw new Error("No se pudo borrar el producto del carrito");
    }
  }

  async updateProductFromCart(cartId, productId, quantityToUpdate) {
    try {
      const cart = await this.cartDao.getCart(cartId);
      const productInDb = await this.productDao.getOne(productId);

      if(!cart || !productInDb) {
        throw new Error("No encontramos el carrito o producto con ese Id")
      }

      const productIndex = cart.products.findIndex(
        (product) => product.id == productInDb.id
      );

      cart.products[productIndex].quantity += Number(quantityToUpdate)

      await this.cartDao.updateProductFromCart(cartId, cart.products)

    } catch (error) {
      throw new Error("No se pudo actualizar el producto del carrito");
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const cart = await this.cartDao.getCart(cartId);

      if(!cart) {
        throw new Error("No encontramos el carrito con ese Id")
      }

      await this.cartDao.deleteAllProductsFromCart(cartId, [])

    } catch (error) {
      throw new Error("No pudimos borrar todos los productos del carrito");
    }
  }
}

export default CartManager;

////////////// FILE SYSTEM //////////////

// import { promises } from "fs";
// // import ProductManager from "./ProductManager.js";
// // import { productManagerServer } from "../routes/productRouter.js";

// class CartManager {
//   carts;
//   path;
//   id = 1;

//   constructor() {
//     this.carts = [];
//     this.path = "./src/data/carts.json";
//   }

//   async createCart() {
//     try {
//       const cartToCreate = {
//         id: this.id,
//         products: [],
//       };

//       this.carts.push(cartToCreate);

//       this.id = this.id + 1;

//       const newCart = await promises.writeFile(
//         this.path,
//         JSON.stringify(this.carts)
//       );

//       return newCart;
//     } catch (error) {
//       throw new Error("No se pudo crear el carrito");
//     }
//   }

//   async getProductsInCart(cartId) {
//     try {
//       const carts = await promises.readFile(this.path, {
//         encoding: "utf-8",
//       });
//       const cartsParsed = JSON.parse(carts);

//       const cartToFind = cartsParsed.find((cart) => cart.id === cartId);

//       const productsToShow = cartToFind.products;

//       return productsToShow;
//     } catch (error) {
//       console.log(error);
//       throw new Error("No se encontro un carrito con ese ID");
//     }
//   }

//   async addProductToCart(cartId, productId) {
//     const cartsFile = await promises.readFile(this.path, {
//       encoding: "utf-8",
//     });

//     const cartParsed = JSON.parse(cartsFile);

//     try {
//       const cart = cartParsed.find((cart) => cart.id === cartId);

//       if (!cart) {
//         throw new Error("No existe ese carrito");
//       }

//       const validProduct = await productManagerServer.getProductById(productId);

//       if (!validProduct) {
//         throw new Error("El producto con ese Id no existe");
//       }

//       const productIndex = cart.products.findIndex(
//         (product) => product.id === productId
//       );

//       productIndex != -1
//         ? (cart.products[productIndex].quantity += 1)
//         : cart.products.push({ id: productId, quantity: 1 });

//       const cartIndex = this.carts.findIndex(
//         (cart) => cart.id === cartId
//       );
//       Object.assign(this.carts.at(cartIndex), {
//         id: cartId,
//         products: [...cart.products],
//       });

//       return await promises.writeFile(
//         this.path,
//         JSON.stringify(this.carts),
//         "utf-8"
//       );
//     } catch (error) {
//       throw new Error("No se pudo agregar el producto al carrito");
//     }
//   }
// }

// export default CartManager;
