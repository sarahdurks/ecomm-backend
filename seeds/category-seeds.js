// Category Seeds
const { Category } = require('../models');
const categoryData = [{
    category_name: 'Shirts',
}, {
    category_name: 'Shorts',
}, {
    category_name: 'Music',
}, {
    category_name: 'Hats',
}, {
    category_name: 'Shoes',
}, ];

const seedCategories = () => Category.bulkCreate(categoryData);

// Seed category data
module.exports = seedCategories;