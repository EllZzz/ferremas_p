import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Category = sequelize.define("Category", {
  idCategory: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Category_name: {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  tableName: 'Category'
});

export default Category;