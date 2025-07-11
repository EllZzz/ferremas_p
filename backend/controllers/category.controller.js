import models from "../models/index.js";

const dto = c => ({ idCategory: c.idCategory, name: c.Category_name });

// GET /api/categories
export const getAllCategories = async (_, res) => {
  try {
    const cats = await models.Category.findAll({
      attributes: ['idCategory', ['Category_name', 'name']]
    });
    res.json(cats);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// GET /api/categories/:id
export const getCategoryById = async (req, res) => {
  const cat = await models.Category.findByPk(req.params.id);
  if (!cat) return res.status(404).json({ error: "Categoría no encontrada" });
  res.json(dto(cat));
};

// POST /api/categories
export const createCategory = async (req, res) => {
  const name = req.body.name?.trim();
  if (!name) return res.status(400).json({ error: "Nombre requerido" });

  const cat = await models.Category.create({ Category_name: name });
  res.status(201).json(dto(cat));
};

// PUT /api/categories/:id
export const updateCategory = async (req, res) => {
  const name = req.body.name?.trim();
  if (!name) return res.status(400).json({ error: "Nombre requerido" });

  const [rows] = await models.Category.update(
    { Category_name: name },
    { where: { idCategory: req.params.id } }
  );

  if (!rows) return res.status(404).json({ error: "Categoría no encontrada" });
  const updated = await models.Category.findByPk(req.params.id);
  res.json(dto(updated));

  console.log(`Intentando actualizar categoría con ID ${editingId} y nombre ${trimmed}`);
};

// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const rows = await models.Category.destroy({
      where: { idCategory: req.params.id }, force: true
    });
    if (!rows) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (e) {
    // error 1451 (MySQL) / 23503 (PG) → FK constraint
    if (e.original?.errno === 1451 || e.original?.code === '23503') {
      return res.status(409).json({
        error: "No se puede eliminar: productos asociados a esta categoría"
      });
    }
    console.error(e);
    res.status(500).json({ error: "Error del servidor" });

    console.log(`Intentando eliminar categoría con ID ${id}`);
  }
};
