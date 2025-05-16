import models from "../models/index.js";

const { Product, Brand, Category, Stock, StoreBranch } = models;

export const getAllProducts = async (req, res) => {
  try {
    const products = await models.Product.findAll({
      include: [
        { model: Brand, as: "productBrand", attributes: ["id", "name"] },
        { model: Category, as: "productCategory", attributes: ["id", "name"] },
        {
          model: Stock,
          as: "productStocks",
          include: [
            {
              model: StoreBranch,
              as: "stockStoreBranch",
              attributes: ["id", "name", "address"]
            }
          ]
        }
      ]
    });

    res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await models.Product.findByPk(id, {
      include: [
        { model: Brand, as: "productBrand", attributes: ["id", "name"] },
        { model: Category, as: "productCategory", attributes: ["id", "name"] },
        {
          model: Stock,
          as: "productStocks",
          include: [
            {
              model: StoreBranch,
              as: "stockStoreBranch",
              attributes: ["id", "name", "address"]
            }
          ]
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, fk_idBrand, fk_category } = req.body;

    const newProduct = await models.Product.create({
      name,
      description,
      price,
      fk_idBrand,
      fk_category
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, fk_idBrand, fk_category } = req.body;

    const product = await models.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.update({
      name: name ?? product.name,
      description: description ?? product.description,
      price: price ?? product.price,
      fk_idBrand: fk_idBrand ?? product.fk_idBrand,
      fk_category: fk_category ?? product.fk_category
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await models.Product.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};
