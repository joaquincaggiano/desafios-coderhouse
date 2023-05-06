import express from "express";
import mongoose from "mongoose";

import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";

void(async() => {
  await mongoose.connect("mongodb+srv://joaquincaggiano:CTqtfjeFoHO25bke@ecomerce.pu4b0sb.mongodb.net/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // app.use(express.static("./public"));
  
  app.use("/api/products", productRouter);
  app.use("/api/carts", cartRouter);
  
  app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
  });
})()

