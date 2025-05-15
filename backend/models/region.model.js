import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Region = sequelize.define("Region", {
  idRegion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Region_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'Region'
});

export default Region;