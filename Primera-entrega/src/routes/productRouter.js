import { Router } from "express";
import ProductManager from "../ProductManager.js";

export const productManagerServer = new ProductManager();

const main = async () => {
  await productManagerServer.addProduct({
    title: "producto prueba1",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123a",
    stock: "25",
  });
  await productManagerServer.addProduct({
    title: "producto prueba2",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123ab",
    stock: "25",
  });
  await productManagerServer.addProduct({
    title: "producto prueba3",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123abc",
    stock: "25",
  });
  await productManagerServer.addProduct({
    title: "producto prueba4",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123abcd",
    stock: "25",
  });
  await productManagerServer.addProduct({
    title: "producto prueba5",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123abcde",
    stock: "25",
  });
  await productManagerServer.addProduct({
    title: "producto prueba6",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123abcdef",
    stock: "25",
  });
  await productManagerServer.addProduct({
    title: "producto prueba7",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123abcdefg",
    stock: "25",
  });
  await productManagerServer.addProduct({
    title: "producto prueba8",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123abcdefgh",
    stock: "25",
  });
  await productManagerServer.addProduct({
    title: "producto prueba9",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123abcdefghi",
    stock: "25",
  });
  await productManagerServer.addProduct({
    title: "producto prueba10",
    description: "Este es un producto prueba",
    price: "200",
    thumbnail: "Sin imagen",
    code: "123abcdefghij",
    stock: "25",
  });
};

main();

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const productsParsed = await productManagerServer.getProducts();
  const limit = req.query.limit || 10;
  const productsLimit = productsParsed.slice(0, limit);

  return res.status(200).json(productsLimit);
});

productRouter.get("/:pid", async (req, res) => {
  const productId = +req.params.pid;
  const productToFind = await productManagerServer.getProductById(productId);
  if (!productToFind)
    return res.status(404).json({ message: "No existe ese producto" });

  return res.status(200).json(productToFind);
});

productRouter.post("/create", async(req, res) => {
    const product = req.body;
    try {
        const newProduct = await productManagerServer.addProduct(product);
        return res.status(200).json({ message: "Producto creado con éxito", data: newProduct });
    } catch (error) {
        // Si no hay un json creado debería crearlo con el producto
        return res.status(400).json({ message: "Fallo en la creación del producto" });
    }
});

productRouter.put("/update/:pid", async(req, res) => {
  const productId = +req.params.pid;
  const productToUpdate = req.body;

  try {
    const updateProduct = await productManagerServer.updateProduct(productId, productToUpdate);
    return res.status(200).json({ message: "Producto actualizado con éxito", data: updateProduct });
  } catch (error) {
    return res.status(400).json({ message: "Fallo en la actualización del producto" });
  }

});

productRouter.delete("/delete/:pid", async(req, res) => {
  const productId = +req.params.pid;

  try {
    const productToDelete = await productManagerServer.deleteProduct(productId);
    return res.status(200).json({ message: "Producto borrado con éxito", data: productToDelete });
  } catch (error) {
    return res.status(400).json({ message: "Fallo en el borrado del producto" });
  }
});

export default productRouter;