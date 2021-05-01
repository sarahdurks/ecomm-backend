// Dependency
const { Model, DataTypes, Deferrable } = require('sequelize');
const { Category } = require('.');
// Connecting
const sequelize = require('../config/connection');

// Proudct class extension
class Product extends Model { }

// Product model set up
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: { isNumber: true }

    },
    stock: {
      type:
        DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate:
        { isNumeric: true 
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product'
  }
);

module.exports = Product;
