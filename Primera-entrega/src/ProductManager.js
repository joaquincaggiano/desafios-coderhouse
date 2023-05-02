// const fs = require("fs").promises;
import { promises } from "fs";

class ProductManager {
  products;
  path;
  id = 1;

  constructor() {
    this.products = [];
    this.path = "./products.json";
  }

  async loadData() {
    // Load JSON information
    this.products = await this.getProducts();
  }

  async addProduct(product) {
    const valuesOfProduct = Object.values(product);
    // console.log("valuesOfProduct", valuesOfProduct)

    valuesOfProduct.map((value) => {
      if (value.trim().length === 0) {
        throw new Error("Debes completar todos los campos");
      }
      return value;
    });

    const productCode = this.products.find(
      (oneProduct) => oneProduct.code === product.code
    );

    if (productCode) {
      throw new Error("Ya existe ese code");
    }

    this.products.push({
      ...product,
      id: this.id,
    });

    this.id = this.id + 1;

    await promises.writeFile(this.path, JSON.stringify(this.products));
    return "producto creado con exito";
  }

  async getProducts() {
    try {
      const products = await promises.readFile(this.path, {
        encoding: "utf-8",
      });
      return JSON.parse(products);
    } catch (error) {
      console.log(`El archivo ${this.path} no existe, creando...`);
      await promises.writeFile(this.path, "[]");
      return [];
    }
  }

  async getProductById(productId) {
    try {
      const products = await promises.readFile(this.path, {
        encoding: "utf-8",
      });
      const productParsed = JSON.parse(products);

      const productToFind = productParsed.find(
        (product) => product.id === productId
      );
      return productToFind;
    } catch (error) {
      console.log(error);
      throw new Error("No se encontro un producto con ese ID");
    }
  }

  async updateProduct(id, product) {
    const productToUpdate = await this.getProductById(id);
    try {
      const valuesOfProduct = Object.values(product);

      valuesOfProduct.map((value) => {
        if (value.trim().length === 0) {
          throw new Error("Debes completar todos los campos");
        }
        return value;
      });

      if (productToUpdate) {
        const filterProducts = this.products.filter(
          (product) => product.id !== productToUpdate.id
        );
        // this.products.push([...filterProducts, Object.assign(productToUpdate, product)]);
        this.products = [
          ...filterProducts,
          Object.assign(productToUpdate, product),
        ];
        await promises.writeFile(this.path, JSON.stringify(this.products));
        return productToUpdate;
      }
    } catch (error) {
      throw new Error("No se puedo actualizar el producto");
    }
  }

  async deleteProduct(id) {
    const productToDelete = await this.getProductById(id);
    try {
      const productsDeleted = this.products.filter(
        (product) => product.id !== productToDelete.id
      );
      await promises.writeFile(this.path, JSON.stringify(productsDeleted));
    } catch (error) {
      throw new Error("No se pudo borrar el producto");
    }
  }
}

// const main = async () => {
//   const productManager1 = new ProductManager();

//   await productManager1.loadData();

//   await productManager1.addProduct({
//     title: "producto prueba",
//     description: "Este es un producto prueba",
//     price: "200",
//     thumbnail: "Sin imagen",
//     code: "123abc",
//     stock: "25",
//   });
//   await productManager1.addProduct({
//     title: "producto prueba",
//     description: "Este es un producto prueba",
//     price: "200",
//     thumbnail: "Sin imagen",
//     code: "123abcd",
//     stock: "25",
//   });
//   // await productManager1.addProduct({
//   //   title: "producto prueba",
//   //   description: "Este es un producto prueba",
//   //   price: "200",
//   //   thumbnail: "Sin imagen",
//   //   code: "123abce",
//   //   stock: "25",
//   // });

//   // const products = await productManager1.getProducts();
//   // console.log(products);

//   // console.log(await productManager1.getProductById(1));

//   // await productManager1.updateProduct(1, {
//   //   title: "Producto Actualizado",
//   //   description: "Este es un producto actualizado",
//   //   price: "400",
//   //   thumbnail: "Sin imagen2",
//   //   code: "123abceeeee",
//   //   stock: "40",
//   // });

//   // const productsUpdate = await productManager1.getProducts();
//   // console.log("PRODUCTOS ACTUALIZADOS", productsUpdate);

//   // await productManager1.deleteProduct(1);

//   // const productsDeleted = await productManager1.getProducts();
//   // console.log(productsDeleted);
// };

// main();

export default ProductManager;
