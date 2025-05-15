import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import User from "./user.model.js";

const Order = sequelize.define("Order", {
  idOrder: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  delivery_method: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  delivery_address: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  delivery_status: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  delivery_total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_iva: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_ftotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  SKU: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  fk_idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'idUser'
    }
  }
}, {
  tableName: 'Order'
});

Order.belongsTo(User, { foreignKey: 'fk_idUser', as: 'user' });

export default Order;