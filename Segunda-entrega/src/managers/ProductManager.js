import ProductMongooseDao from "../daos/productMongooseDao.js";

class ProductManager {
  constructor() {
    this.productDao = new ProductMongooseDao();
  }

  async find(limit,  type, sort) {
    try {
      return this.productDao.find(limit, type, sort);
    } catch (error) {
      throw new Error("No pudimos encontrar los productos");
    }
  }

  async getOne(id) {
    try {
      return this.productDao.getOne(id);
    } catch (error) {
      throw new Error(`No pudimos encontrar el producto con id: ${id}`);
    }
  }

  async create(data) {
    if (!data.title || data.title.trim().length === 0)
      throw Error("Empty title field");

    if (!data.description || data.description.trim().length === 0)
      throw Error("Empty description field");

    if (!data.price) throw Error("Empty price field");

    if (!data.thumbnail || data.thumbnail.trim().length === 0)
      throw Error("Empty thumbnail field");

    if (!data.code || data.code.trim().length === 0)
      throw Error("Empty code field");

    if (!data.stock) throw Error("Empty stock field");

    const codeExist = await this.productDao.findByFilter({ code: data.code });
    if (codeExist.length) {
      throw new Error("El código del producto ya existe");
    }

    const productToCreate = await this.productDao.create(data);

    return productToCreate;
  }

  async updateOne(id, data) {
    // const productToUpdate = await this.productDao.getOne(id);
    // const productsInDb = await this.productDao.find();
    try {
      const valuesOfProduct = Object.values(data);

      valuesOfProduct.map((value) => {
        if (value.trim().length === 0) {
          throw new Error("Debes completar todos los campos");
        }
        return value;
      });

      return this.productDao.updateOne(id, data);
    } catch (error) {
      throw new Error("No se puedo actualizar el producto");
    }
  }

  async deleteOne(id) {
    try {
      return this.productDao.deleteOne(id);
    } catch (error) {
      throw new Error("No se pudo borrar el producto");
    }
  }
}

export default ProductManager;

///////////////////////////     FILE SYSTEM     ///////////////////////////

// import { promises } from "fs";

// class ProductManager {
//   products;
//   path;
//   id = 1;

//   constructor() {
//     this.products = [];
//     this.path = "./src/data/products.json";
//   }

//   async loadData() {
//     // Load JSON information
//     this.products = await this.getProducts();
//   }

//   async addProduct(product) {
//     const valuesOfProduct = Object.values(product);
//     // console.log("valuesOfProduct", valuesOfProduct)

//     valuesOfProduct.map((value) => {
//       if (typeof value === String) {
//         if (value.trim().length === 0) {
//           throw new Error("Debes completar todos los campos");
//         } else {
//           return value;
//         }
//       }
//       if (typeof value === Number) {
//         if (!value) {
//           throw new Error("Debes completar todos los campos");
//         } else {
//           return value;
//         }
//       }
//     });

//     const productCode = this.products.find(
//       (oneProduct) => oneProduct.code === product.code
//     );

//     if (productCode) {
//       throw new Error("Ya existe ese code");
//     }

//     this.products.push({
//       ...product,
//       id: this.id,
//     });

//     this.id = this.id + 1;

//     await promises.writeFile(this.path, JSON.stringify(this.products));
//     return "producto creado con exito";
//   }

//   async getProducts() {
//     try {
//       const products = await promises.readFile(this.path, {
//         encoding: "utf-8",
//       });
//       return JSON.parse(products);
//     } catch (error) {
//       console.log(`El archivo ${this.path} no existe, creando...`);
//       await promises.writeFile(this.path, "[]");
//       return [];
//     }
//   }

//   async getProductById(productId) {
//     try {
//       const products = await promises.readFile(this.path, {
//         encoding: "utf-8",
//       });
//       const productParsed = JSON.parse(products);

//       const productToFind = productParsed.find(
//         (product) => product.id === productId
//       );
//       return productToFind;
//     } catch (error) {
//       console.log(error);
//       throw new Error("No se encontro un producto con ese ID");
//     }
//   }

//   async updateProduct(id, product) {
//     const productToUpdate = await this.getProductById(id);
//     try {
//       const valuesOfProduct = Object.values(product);

//       valuesOfProduct.map((value) => {
//         if (value.trim().length === 0) {
//           throw new Error("Debes completar todos los campos");
//         }
//         return value;
//       });

//       if (productToUpdate) {
//         const filterProducts = this.products.filter(
//           (product) => product.id !== productToUpdate.id
//         );
//         // this.products.push([...filterProducts, Object.assign(productToUpdate, product)]);
//         this.products = [
//           ...filterProducts,
//           Object.assign(productToUpdate, product),
//         ];
//         await promises.writeFile(this.path, JSON.stringify(this.products));
//         return productToUpdate;
//       }
//     } catch (error) {
//       throw new Error("No se puedo actualizar el producto");
//     }
//   }

//   async deleteProduct(id) {
//     const productToDelete = await this.getProductById(id);
//     try {
//       const productsDeleted = this.products.filter(
//         (product) => product.id !== productToDelete.id
//       );
//       await promises.writeFile(this.path, JSON.stringify(productsDeleted));
//     } catch (error) {
//       throw new Error("No se pudo borrar el producto");
//     }
//   }
// }

// export default ProductManager;
