import productSchema from "../models/productSchema.js";

class ProductMongooseDao {
  async find(limit, type, sort) {
    const aggregation = [];
    try {
      aggregation.push({
        $limit: limit,
      });
      if (type) {
        aggregation.push({
          $match: { category: type },
        });
      }
      if (sort) {
        aggregation.push({
          $sort: {
            price: sort,
          },
        });
      }

      const filtered = await productSchema.aggregate(aggregation);

      return filtered.map((document) => ({
        id: document._id,
        title: document.title,
        description: document.description,
        price: document.price,
        thumbnail: document.thumbnail,
        code: document.code,
        stock: document.stock,
        category: document.category,
        status: document.status,
      }));

      // const productsDocument = await productSchema.paginate();

      // return productsDocument.map((document) => ({
      //   id: document._id,
      //   title: document.title,
      //   description: document.description,
      //   price: document.price,
      //   thumbnail: document.thumbnail,
      //   code: document.code,
      //   stock: document.stock,
      //   status: document.status,
      // }));
    } catch (error) {
      console.log(error);
      throw new Error("No se pudieron encontrar los productos");
    }
  }

  async findByFilter(filter) {
    try {
      const products = await productSchema.find(filter);
      return products;
    } catch (error) {
      throw new Error("No pudimos encontrar los productos filtrados");
    }
  }

  async getOne(id) {
    try {
      const producDocument = await productSchema.findOne({ _id: id });

      return {
        id: producDocument._id,
        title: producDocument.title,
        description: producDocument.description,
        price: producDocument.price,
        thumbnail: producDocument.thumbnail,
        code: producDocument.code,
        stock: producDocument.stock,
        category: producDocument.category,
        status: producDocument.status,
      };
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo encontrar el producto");
    }
  }

  async create(data) {
    try {
      const producDocument = await productSchema.create(data);

      return {
        id: producDocument._id,
        title: producDocument.title,
        description: producDocument.description,
        price: producDocument.price,
        thumbnail: producDocument.thumbnail,
        code: producDocument.code,
        stock: producDocument.stock,
        category: producDocument.category,
        status: producDocument.status,
      };
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo crear el producto");
    }
  }

  async updateOne(id, data) {
    try {
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
        category: producDocument.category,
      };
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo actualizar el producto");
    }
  }

  async deleteOne(id) {
    try {
      await productSchema.findByIdAndUpdate(
        { _id: id },
        { status: false },
        { new: true }
      );
      return true;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo borrar el producto");
    }
  }
}

export default ProductMongooseDao;
