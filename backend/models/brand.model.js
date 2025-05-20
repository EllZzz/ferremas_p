import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Brand = sequelize.define("Brand", {
  idBrand: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brand_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'Brand',
  timestamps: false // ⬅️ Esto es importante si tu tabla no tiene createdAt/updatedAt
});

export default Brand;
