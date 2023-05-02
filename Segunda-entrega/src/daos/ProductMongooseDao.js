import productSchema from "../models/productSchema.js";

class ProductMongooseDao {
  async find() { // getAll, find, list, getStudents
    const productsDocument = await productSchema.find();

    return productsDocument.map((document) => ({
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
    }));
  }

  async getOne(
    id // getOne, get, getStudent
  ) {
    const producDocument = await productSchema.findOne({ _id: id });

    return {
      id: producDocument._id,
      title: producDocument.title,
      description: producDocument.description,
      price: producDocument.price,
      thumbnail: producDocument.thumbnail,
      code: producDocument.code,
      stock: producDocument.stock,
    };
  }

  async create(
    data // create, save, insert
  ) {
    const producDocument = await productSchema.create(data);

    return {
      id: producDocument._id,
      title: producDocument.title,
      description: producDocument.description,
      price: producDocument.price,
      thumbnail: producDocument.thumbnail,
      code: producDocument.code,
      stock: producDocument.stock,
    };
  }

  async updateOne(
    id,
    data // update, updateOne, modify
  ) {
    const producDocument = await productSchema.findOneAndUpdate(
      { _id: id },
      data,
      { new: true }
    );

    return {
      id: producDocument._id,
      title: producDocument.title,
      description: producDocument.description,
      price: producDocument.price,
      thumbnail: producDocument.thumbnail,
      code: producDocument.code,
      stock: producDocument.stock,
    };
  }

  async deleteOne(
    id // delete, deleteOne, remove, removeOne
  ) {
    return productSchema.deleteOne({ _id: id });
  }
}

export default ProductMongooseDao;