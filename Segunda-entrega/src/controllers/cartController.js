import CartManager from "../managers/CartManager.js";

class CartController {
  static getCart = async (req, res) => {
    const manager = new CartManager();

    try {
      const cartId = req.params.cid;
      const productsToShow = await manager.getCart(cartId);
      return res
        .status(200)
        .json({ message: "Carrito", data: productsToShow });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Carrito no encontrado` });
    }
  };
}

export const getAllCarts = async (req, res) => {
  const manager = new CartManager();

  try {
    const productsToShow = await manager.getAllCarts();
    return res
      .status(200)
      .json({ message: "Carritos", data: productsToShow });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Carritos no encontrado` });
  }
}

export const createCart = async (req, res) => {
  const manager = new CartManager();

  try {
    const newCart = await manager.createCart(req.body);
    return res
      .status(200)
      .json({ message: "Carrito creado con éxito", data: newCart });
  } catch (error) {
    return res.status(400).json({ message: "Carrito no creado" });
  }
};

export const addProductToCart = async (req, res) => {
  const manager = new CartManager();

  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const productToAdd = await manager.addProductToCart(cartId, productId);
    return res.status(200).json({ message: "Producto agregado con éxito al carrito", data: productToAdd });
  } catch (error) {
    return res.status(400).json({ message: "El producto no ha sido agregado" });
  }
};

export const deleteProductFromCart = async (req, res) => {
  const manager = new CartManager();

  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const productToDeleteFromCart = await manager.deleteProductFromCart(cartId, productId);
    return res.status(200).json({ message: "Producto borrado con éxito del carrito", data: productToDeleteFromCart });
  } catch (error) {
    return res.status(400).json({ message: "El producto no ha sido borrado del carrito" });
  }
}

export const updateProductFromCart = async (req, res) => {
  const manager = new CartManager();

  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const {quantity} = req.body;
    const productToUpdateInCart = await manager.updateProductFromCart(cartId, productId, quantity);
    return res.status(200).json({ message: "Producto actualizado con éxito en el carrito", data: productToUpdateInCart });
  } catch (error) {
    return res.status(400).json({ message: "El producto no ha sido actualizado en el carrito" });
  }
}

export const deleteAllProductsFromCart = async (req, res) => {
  const manager = new CartManager();
  try {
    const cartId = req.params.cid;
    const deleteAllProducts = await manager.deleteAllProductsFromCart(cartId);
    return res.status(200).json({ message: "Todos los productos han sido borrado del carrito", data: deleteAllProducts });
  } catch (error) {
    return res.status(400).json({ message: "No pudimos borrar todos los productos del carrito" });
  }
}

export default CartController;
