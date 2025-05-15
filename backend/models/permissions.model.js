import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Permissions = sequelize.define("Permissions", {
  idPermissions: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  permission_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'Permissions'
});

export default Permissions;