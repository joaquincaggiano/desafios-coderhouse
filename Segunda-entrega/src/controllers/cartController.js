import CartManager from "../managers/CartManager.js";

class CartController {
  static list = async (req, res) => {
    const manager = new CartManager();

    try {
      const cartId = req.params.cid;
      const productsToShow = await manager.getCart(cartId);
      return res
        .status(200)
        .json({ message: "Productos", data: productsToShow });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Carrito no encontrado` });
    }
  };
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
    return res
      .status(200)
      .json({
        message: "Producto agregado con éxito al carrito",
        data: productToAdd,
      });
  } catch (error) {
    return res.status(400).json({ message: "El producto no ha sido agregado" });
  }
};

export default CartController;
