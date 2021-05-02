// Product Tag Model
// Dependencies
const { Model, DataTypes, Deferrable } = require('sequelize');
const  Product = require('./Product')
const  Tag = require('./Tag')
// Connect
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

/* Checked requirements:

DEFERRABLE (currently IMMEDIATE) all rows are checked at the end of the insert/update 

ProductTag
- id
  - Integer
  - Doesn't allow null values
  - Set as primary key
  - Uses auto increment

- product_id
  - Integer
  - References the product model's id

tag_id
  - Integer
  - References the tag model's id
  */