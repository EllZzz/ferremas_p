import models from "../models/index.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await models.Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = await models.Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(400).json({ error: "Error al crear categoría" });
  }
};
