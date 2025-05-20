import models from "../models/index.js";

export const getAllBrands = async (req, res) => {
  try {
    const brands = await models.Brand.findAll();
    res.json(brands);
  } catch (error) {
    console.error("Error al obtener marcas:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const getBrandById = async (req, res) => {
  try {
    const brand = await models.Brand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ error: "Marca no encontrada" });
    res.json(brand);
  } catch (error) {
    console.error("Error al obtener marca:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const createBrand = async (req, res) => {
  try {
    const newBrand = await models.Brand.create(req.body);
    res.status(201).json(newBrand);
  } catch (error) {
    console.error("Error al crear marca:", error);
    res.status(400).json({ error: "Error al crear marca" });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const brand = await models.Brand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ error: "Marca no encontrada" });

    await brand.update(req.body);
    res.json(brand);
  } catch (error) {
    console.error("Error al actualizar marca:", error);
    res.status(400).json({ error: "Error al actualizar marca" });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brand = await models.Brand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ error: "Marca no encontrada" });

    await brand.destroy();
    res.json({ message: "Marca eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar marca:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
