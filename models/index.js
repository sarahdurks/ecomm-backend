// Sequelize Models//
// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Model specifications
Product.belongsTo(Category, {foreignKey: 'category_id' });
Category.hasMany(Product, {foreignKey: 'category_id' })
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

/* Checked Requirements:
- Product belongs to Category, as a category can have multiple products but a product can only belong to one category.
- Category has many Product models.
- Product belongs to many Tag models. Using the ProductTag through model, allow products to have multiple tags and tags to have many products.
- Tag belongs to many Product models.*/