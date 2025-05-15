import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Commune from "./commune.model.js";

const StoreBranch = sequelize.define("StoreBranch", {
  idStoreBranch: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  storebranch_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  storebranch_address: {
    type: DataTypes.STRING(45),
    allowNull: false
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
  tableName: 'StoreBranch'
});

StoreBranch.belongsTo(Commune, { foreignKey: 'fk_idCommune', as: 'commune' });

export default StoreBranch;