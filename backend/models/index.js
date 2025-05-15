import sequelize from "../config/db.config.js";

import Permissions from "./permissions.model.js";
import Rol from "./rol.model.js";
import Region from "./region.model.js";
import Commune from "./commune.model.js";
import User from "./user.model.js";
import Order from "./order.model.js";
import Category from "./category.model.js";
import Brand from "./brand.model.js";
import Product from "./product.model.js";
import StoreBranch from "./storebranch.model.js";
import Stock from "./stock.model.js";
import Payment from "./payment.model.js";
import Complaint from "./complaint.model.js";
import Review from "./review.model.js";

Rol.belongsTo(Permissions, { foreignKey: 'fk_idPermissions', as: 'permission' });
Permissions.hasMany(Rol, { foreignKey: 'fk_idPermissions', as: 'roles' });


Commune.belongsTo(Region, { foreignKey: 'fk_idRegion', as: 'communeRegion' });
Region.hasMany(Commune, { foreignKey: 'fk_idRegion', as: 'regionCommunes' });


User.belongsTo(Rol, { foreignKey: 'fk_idRol', as: 'userRol' });
Rol.hasMany(User, { foreignKey: 'fk_idRol', as: 'rolUsers' });


User.belongsTo(Commune, { foreignKey: 'fk_idCommune', as: 'userCommune' });
Commune.hasMany(User, { foreignKey: 'fk_idCommune', as: 'communeUsers' });


Order.belongsTo(User, { foreignKey: 'fk_idUser', as: 'orderUser' });
User.hasMany(Order, { foreignKey: 'fk_idUser', as: 'userOrders' });


Product.belongsTo(Brand, { foreignKey: 'fk_idBrand', as: 'productBrand' });
Brand.hasMany(Product, { foreignKey: 'fk_idBrand', as: 'brandProducts' });


Product.belongsTo(Category, { foreignKey: 'fk_category', as: 'productCategory' });
Category.hasMany(Product, { foreignKey: 'fk_category', as: 'categoryProducts' });


StoreBranch.belongsTo(Commune, { foreignKey: 'fk_idCommune', as: 'branchCommune' });
Commune.hasMany(StoreBranch, { foreignKey: 'fk_idCommune', as: 'communeBranches' });


Stock.belongsTo(Product, { foreignKey: 'fk_idProduct', as: 'stockProduct' });
Product.hasMany(Stock, { foreignKey: 'fk_idProduct', as: 'productStocks' });


Stock.belongsTo(StoreBranch, { foreignKey: 'fk_idStoreBranch', as: 'stockStoreBranch' });
StoreBranch.hasMany(Stock, { foreignKey: 'fk_idStoreBranch', as: 'branchStocks' });


Payment.belongsTo(Order, { foreignKey: 'fk_idOrder', as: 'paymentOrder' });
Order.hasMany(Payment, { foreignKey: 'fk_idOrder', as: 'orderPayments' });


Complaint.belongsTo(User, { foreignKey: 'fk_idUser', as: 'complaintUser' });
User.hasMany(Complaint, { foreignKey: 'fk_idUser', as: 'userComplaints' });


Complaint.belongsTo(Order, { foreignKey: 'fk_idOrder', as: 'complaintOrder' });
Order.hasMany(Complaint, { foreignKey: 'fk_idOrder', as: 'orderComplaints' });


Review.belongsTo(User, { foreignKey: 'fk_idUser', as: 'reviewUser' });
User.hasMany(Review, { foreignKey: 'fk_idUser', as: 'userReviews' });


Review.belongsTo(Product, { foreignKey: 'fk_idProduct', as: 'reviewProduct' });
Product.hasMany(Review, { foreignKey: 'fk_idProduct', as: 'productReviews' });

const models = {
  sequelize,
  Permissions,
  Rol,
  Region,
  Commune,
  User,
  Order,
  Category,
  Brand,
  Product,
  StoreBranch,
  Stock,
  Payment,
  Complaint,
  Review
};

export default models;