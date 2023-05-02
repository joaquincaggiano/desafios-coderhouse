import { Router } from "express";
import ProductController, {deleteOne, getOne, add, update} from "../controllers/productController.js";
// import ProductManager from "../managers/ProductManager.js";

// export const productManagerServer = new ProductManager();

// const main = async () => {
//   await productManagerServer.addProduct({
//     title: "producto prueba1",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123a",
//     stock: 25,
//   });
//   await productManagerServer.addProduct({
//     title: "producto prueba2",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123ab",
//     stock: 25,
//   });
//   await productManagerServer.addProduct({
//     title: "producto prueba3",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123abc",
//     stock: 25,
//   });
//   await productManagerServer.addProduct({
//     title: "producto prueba4",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123abcd",
//     stock: 25,
//   });
//   await productManagerServer.addProduct({
//     title: "producto prueba5",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123abcde",
//     stock: 25,
//   });
//   await productManagerServer.addProduct({
//     title: "producto prueba6",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123abcdef",
//     stock: 25,
//   });
//   await productManagerServer.addProduct({
//     title: "producto prueba7",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123abcdefg",
//     stock: 25,
//   });
//   await productManagerServer.addProduct({
//     title: "producto prueba8",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123abcdefgh",
//     stock: 25,
//   });
//   await productManagerServer.addProduct({
//     title: "producto prueba9",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123abcdefghi",
//     stock: 25,
//   });
//   await productManagerServer.addProduct({
//     title: "producto prueba10",
//     description: "Este es un producto prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "123abcdefghij",
//     stock: 25,
//   });
// };

// main();

const productRouter = Router();

// all products
productRouter.get("/", ProductController.list);

// one product
productRouter.get("/:pid", getOne);

// create product
productRouter.post("/create", add);

// update product
productRouter.put("/update/:pid", update);

// delete product
productRouter.delete("/delete/:pid", deleteOne);

export default productRouter;