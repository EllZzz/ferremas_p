import models from "../models/index.js";

export const getAllUsers = async (res) => {
  try {
    const users = await models.User.findAll({
      include: [
        { model: models.Rol, as: "rol" },
        { model: models.Commune, as: "commune" }
      ]
    });
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await models.User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(400).json({ error: "Error al crear usuario" });
  }
};
