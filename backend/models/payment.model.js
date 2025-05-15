import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Order from "./order.model.js";

const Payment = sequelize.define("Payment", {
  idPayment: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  payment_method: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  payment_status: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  payment_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  payment_receipt: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  fk_idOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'idOrder'
    }
  }
}, {
  tableName: 'Payment'
});

Payment.belongsTo(Order, { foreignKey: 'fk_idOrder', as: 'order' });

export default Payment;