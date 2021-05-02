// Tag Model

// Dependencies
const { Model, DataTypes } = require("sequelize");

//Connect
const sequelize = require("../config/connection.js");

// Tag Class
class Tag extends Model { }

// Tag set up
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag'
  }
);

module.exports = Tag;
/* Requirements:
Tag
- id
  - Integer
  - Doesn't allow null values
  - Set as primary key
  - Uses auto increment

- tag_name
  - String */