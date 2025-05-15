import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Permissions from "./permissions.model.js";

const Rol = sequelize.define("Rol", {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_rol: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  fk_idPermissions: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Permissions,
      key: 'idPermissions'
    }
  }
}, {
  tableName: 'Rol'
});

Rol.belongsTo(Permissions, { foreignKey: 'fk_idPermissions', as: 'permissions' });

export default Rol;