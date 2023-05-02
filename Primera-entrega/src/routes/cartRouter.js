import { Router } from "express";
import CartManager from "../CartManager.js";
// import ProductManager from "../ProductManager.js";

const cartManagerServer = new CartManager();

const cartRouter = Router();

cartRouter.post("/create", async(req, res) => {
    try {
        const newCart = await cartManagerServer.createCart();
        return res.status(200).json({message: "Carrito creado con éxito", data: newCart})
    } catch (error) {
        return res.status(400).json({message: "Carrito no creado"})
    }
})

cartRouter.get("/:cid", async(req, res) => {
    try {
        const cartId = +req.params.cid;
        const productsToShow = await cartManagerServer.getProductsInCart(cartId)
        return res.status(200).json({message: "Productos", data: productsToShow})
    } catch (error) {
        return res.status(400).json({message: `Carrito ${cartId} no encontrado`});
    }
})

cartRouter.post("/:cid/products/:pid", async(req, res) => {
    try {
        const cartId = +req.params.cid
        const productId = +req.params.pid;
        const productToAdd = await cartManagerServer.addProductToCart(cartId, productId);
        return res.status(200).json({message: "Producto agregado con éxito al carrito", data: productToAdd})
    } catch (error) {
        return res.status(400).json({message: "El producto no ha sido agregado"});
    }
})

export default cartRouter;
