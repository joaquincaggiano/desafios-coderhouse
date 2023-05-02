import express from "express";
import productRouter from "./src/routes/productRouter.js";
import cartRouter from "./src/routes/cartRouter.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
