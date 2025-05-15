import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Product from "./product.model.js";
import StoreBranch from "./storebranch.model.js";

const Stock = sequelize.define("Stock", {
  idStock: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  stock_cant: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fk_idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'idProduct'
    }
  },
  fk_idStoreBranch: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: StoreBranch,
      key: 'idStoreBranch'
    }
  }
}, {
  tableName: 'Stock'
});

Stock.belongsTo(Product, { foreignKey: 'fk_idProduct', as: 'product' });
Stock.belongsTo(StoreBranch, { foreignKey: 'fk_idStoreBranch', as: 'storeBranch' });

export default Stock;