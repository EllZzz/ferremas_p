import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import User from "./user.model.js";
import Product from "./product.model.js";

const Review = sequelize.define("Review", {
  idReview: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  review_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  review_rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  review_desc: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  fk_idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'idUser'
    }
  },
  fk_idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'idProduct'
    }
  }
}, {
  tableName: 'Review'
});

Review.belongsTo(User, { foreignKey: 'fk_idUser', as: 'user' });
Review.belongsTo(Product, { foreignKey: 'fk_idProduct', as: 'product' });

export default Review;