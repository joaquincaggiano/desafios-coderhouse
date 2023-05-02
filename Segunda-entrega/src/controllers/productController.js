import ProductManager from "../managers/ProductManager.js";

class ProductController {
  static list = async (req, res) => {
    const manager = new ProductManager();

    const products = await manager.find();
    const limit = req.query.limit || 10;
    const productsLimit = products.slice(0, limit);

    return res.status(200).json(productsLimit);
  };
}

export const getOne = async (req, res) => {
  const productId = req.params.pid;

  const manager = new ProductManager();

  const productToFind = await manager.getOne(productId);

  if (!productToFind)
    return res.status(404).json({ message: "No existe ese producto" });

  return res.status(200).json(productToFind);
};

export const add = async (req, res) => {
  const manager = new ProductManager();

  const product = req.body;
  try {
    const newProduct = await await manager.create(product);
    return res
      .status(200)
      .json({ message: "Producto creado con éxito", data: newProduct });
  } catch (error) {
    // Si no hay un json creado debería crearlo con el producto
    return res
      .status(400)
      .json({ message: "Fallo en la creación del producto" });
  }
};

export const update = async (req, res) => {
  const productId = req.params.pid;
  const productToUpdate = req.body;

  const manager = new ProductManager();

  try {
    const updateProduct = await manager.updateOne(productId, productToUpdate);
    return res
      .status(200)
      .json({ message: "Producto actualizado con éxito", data: updateProduct });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Fallo en la actualización del producto" });
  }
};

export const deleteOne = async (req, res) => {
  const productId = req.params.pid;

  const manager = new ProductManager();

  try {
    const productToDelete = await manager.deleteOne(productId);
    return res
      .status(200)
      .json({ message: "Producto borrado con éxito", data: productToDelete });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Fallo en el borrado del producto" });
  }
};

export default ProductController;
