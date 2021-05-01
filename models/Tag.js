// Dependencies
const { Model, DataTypes } = require("sequelize");
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
    modelName: "tag"
  }
);

module.exports = Tag;
