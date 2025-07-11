import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Brand from "./brand.model.js";
import Category from "./category.model.js";

const Product = sequelize.define("Product", {
  idProduct: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  fk_idBrand: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Brand,
      key: 'idBrand'
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_unitprice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_img: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  fk_category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'idCategory'
    }
  }
}, {
  tableName: 'Product'
});

export default Product;