// Routes Index 

//Dependencies
const router = require('express').Router();
const tagRoutes = require('./tag-routes');
const productRoutes = require('./product-routes');
const categoryRoutes = require('./category-routes');

// Use routes
router.use('/tag', tagRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);



module.exports = router;
