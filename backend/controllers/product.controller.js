import models from "../models/index.js";


export const getAllProducts = async (req, res) => {
  try {
    const products = await models.Product.findAll({
      include: [
  { model: models.Brand, as: "brand" },
  { model: models.Category, as: "category" }
]

    });
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};


export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.findByPk(id, {
      include: [
        { model: models.Brand, as: "productBrand" },
        { model: models.Category, as: "productCategory" }
      ]
    });

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};


export const createProduct = async (req, res) => {
  try {
    const newProduct = await models.Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(400).json({ error: "Error al crear producto" });
  }
};


export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(400).json({ error: "Error al actualizar producto" });
  }
};


export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.destroy();
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
