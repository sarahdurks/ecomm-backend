// Dependencies
const router = require('express').Router();
const {
    Category,
    Product
} = require('../../models');

// find all categories and include associated products
router.get('/', async (req, res) => {
    try {
        let getAllCategories = await Category.findAll({
            include: [Product]
        });
        res.json(getAllCategories);
    } catch (e) {
        res.status(400).json(e);
    }
});
// Find Category by Id
router.get('/:id', async (req, res) => {
    let {
        id
    } = req.params;
    try {
        let categoryById = await Category.findOne({
            where: {
                id
            },
            include: [Product]
        });
        if (!categoryById) {
            return res.status(400).json({
                error: `Unable to find category where id: ${id}`
            });
        }
        res.status(200).json(categoryById);
    } catch (e) {
        res.status(400).json(e)
    }
});
// Create a new category
router.post('/', async (req, res) => {
    let {
        category_name
    } = req.body;
    try {
        if (!category_name) {
            return res.status(400).json({
                error: `Please enter a valid category, ${category_name} did not work}`
            });
        }
        category_name = category_name.trim();
        let newCategory = await Category.create({
            category_name
        });
        res.json(newCategory);
    } catch (e) {
        res.status(400).json(e);
    }
});

// Update category by id value
router.put('/:id', async (req, res) => {
    let {
        id
    } = req.params;
    let {
        category_name
    } = req.body;
    try {
        await Category.update({
            category_name
        }, {
            where: {
                id
            }
        });
        let categoryById = await Category.findOne({
            where: {
                id
            }
        });
        if (!categoryById) {
            return res.status(400).json({
                error: `There is no category with this id: ${id}`
            });
        }
        res.json(categoryById);
    } catch (e) {
        res.status(400).json(e);
    }
});
// Delete categories by id
router.delete('/:id', async (req, res) => {
    let {
        id
    } = req.params;
    try {
        let categoryById = await Category.findOne({
            where: {
                id
            }
        });
        if (!categoryById) {
            return res.status(400).json({
                error: `There is an issue with deleting this id: ${id} `
            });
        }
        await Category.destroy({
            where: {
                id
            }
        });
        res.status(200).json({
            Deleted: categoryById
        });
    } catch (e) {
        res.status(400).json(e);
    }
});
module.exports = router;