import models from "../models/index.js";

export const getAllStock = async (req, res) => {
  try {
    const stock = await models.Stock.findAll({
      include: [
        { model: Product, as: 'stockProduct' },
        { model: StoreBranch, as: 'stockStoreBranch' },
      ],
    });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el stock", error });
  }
};

export const getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await models.Stock.findByPk(id, {
      include: [
        { model: Product, as: 'stockProduct' },
        { model: StoreBranch, as: 'stockStoreBranch' },
      ],
    });

    if (!stock) {
      return res.status(404).json({ message: "Stock no encontrado" });
    }

    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el stock", error });
  }
};

export const createStock = async (req, res) => {
  try {
    const { fk_idProduct, fk_idStoreBranch, quantity } = req.body;

    const newStock = await models.Stock.create({
      fk_idProduct,
      fk_idStoreBranch,
      quantity,
    });

    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el stock", error });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const stock = await models.Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock no encontrado" });
    }

    stock.quantity = quantity;
    await stock.save();

    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el stock", error });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.Stock.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Stock no encontrado" });
    }

    res.json({ message: "Stock eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el stock", error });
  }
};
