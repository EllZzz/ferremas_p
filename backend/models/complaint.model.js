import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import User from "./user.model.js";
import Order from "./order.model.js";

const Complaint = sequelize.define("Complaint", {
  idComplaint: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  complaint_desc: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  complaint_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fk_idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'idUser'
    }
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
  tableName: 'Complaint'
});

Complaint.belongsTo(User, { foreignKey: 'fk_idUser', as: 'user' });
Complaint.belongsTo(Order, { foreignKey: 'fk_idOrder', as: 'order' });

export default Complaint;