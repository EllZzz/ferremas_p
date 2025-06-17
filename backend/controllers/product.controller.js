// backend/controllers/productController.js
import models from "../models/index.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await models.Product.findAll({
      include: [
        { model: models.Brand, as: "brand" },
        { model: models.Category, as: "category" }
      ]
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.findByPk(id, {
      include: [
        { model: models.Brand, as: "brand" },
        { model: models.Category, as: "category" }
      ]
    });

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  const { product_name, fk_idBrand, stock, product_unitprice, fk_category, product_img } = req.body;

  if (!product_name || !fk_idBrand || stock == null || !product_unitprice || !fk_category) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    const newProduct = await models.Product.create({
      product_name,
      fk_idBrand,
      stock,
      product_unitprice,
      fk_category,
      product_img: product_img || null
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(400).json({ error: "Error al crear producto" });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const updated = await product.update(req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(400).json({ error: "Error al actualizar producto" });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.destroy();
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
