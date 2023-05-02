import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const productManagerServer = new ProductManager();

const main = async() => {
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
}

main()


app.get("/products", async(req, res) => {
  const productsParsed = await productManagerServer.getProducts()
  const limit = req.query.limit || 10;
  const productsLimit = productsParsed.slice(0, limit);

  return res.status(200).json(productsLimit)
});

app.get("/products/:pid", async(req, res) => {
  const productId = +req.params.pid;
  const productToFind = await productManagerServer.getProductById(productId);
  if(!productToFind) return res.status(404).json({message: "No existe ese producto"})

  return res.status(200).json(productToFind)
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
