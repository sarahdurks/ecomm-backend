// dependencies
const { Model, DataTypes, Deferrable } = require('sequelize');
const  Product = require('./Product')
const  Tag = require('./Tag')
const sequelize = require('../config/connection.js');

// Product class Tag
class ProductTag extends Model { }

// Product tag set up
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
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
    modelName: 'product_tag'
  }
);

module.exports = ProductTag;
