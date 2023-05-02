// import CartManager from "../managers/CartManager.js";
// import ProductManager from "../ProductManager.js";
// const cartManagerServer = new CartManager();
import { Router } from "express";
import CartController, {createCart, addProductToCart} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/create", createCart)

cartRouter.get("/:cid", CartController.list)

cartRouter.post("/:cid/product/:pid", addProductToCart)

export default cartRouter;
