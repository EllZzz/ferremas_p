import models from "../models/index.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await models.Product.findAll({
      include: [
  { model: models.Brand, as: "productBrand" },
  { model: models.Category, as: "productCategory" }
]

    });
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
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
