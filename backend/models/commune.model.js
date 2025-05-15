// models/commune.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Region from "./region.model.js";

const Commune = sequelize.define("Commune", {
  idCommune: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Commune_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  fk_idRegion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Region,
      key: 'idRegion'
    }
  }
}, {
  tableName: 'Commune'
});

Commune.belongsTo(Region, { foreignKey: 'fk_idRegion', as: 'region' });

export default Commune;