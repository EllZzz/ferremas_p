import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Rol from "./rol.model.js";
import Commune from "./commune.model.js";

const User = sequelize.define("User", {
  idUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rut: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  fk_idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Rol,
      key: 'idRol'
    }
  },
  fk_idCommune: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Commune,
      key: 'idCommune'
    }
  }
}, {
  tableName: 'User'
});

User.belongsTo(Rol, { foreignKey: 'fk_idRol', as: 'rol' });
User.belongsTo(Commune, { foreignKey: 'fk_idCommune', as: 'commune' });

export default User;