// import CartManager from "../managers/CartManager.js";
// import ProductManager from "../ProductManager.js";
// const cartManagerServer = new CartManager();
import { Router } from "express";
import CartController, {
  createCart,
  addProductToCart,
  deleteProductFromCart,
  updateProductFromCart,
  deleteAllProductsFromCart
} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/create", createCart);

cartRouter.get("/:cid", CartController.list);

cartRouter.post("/:cid/product/:pid", addProductToCart);

cartRouter.delete("/:cid/product/:pid", deleteProductFromCart);

cartRouter.put("/:cid/product/:pid", updateProductFromCart);

cartRouter.delete("/:cid", deleteAllProductsFromCart)

export default cartRouter;
