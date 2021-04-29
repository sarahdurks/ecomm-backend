const router = require('express').Router();
const { Category, Product } = require('../../models');

// find all categories and include associated products
router.get('/', async (req, res) => {
  try {
    const getAllCategories = await Category.findAll ({ include: [Product]});
    res.json(getAllCategories);
  }
  catch(e){
    res.status(400).json(e);
  }
});
// find a category by id, include associated products
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try { const categoryById = await Category.findOne({ where: {id}, include: [Product]});
if (!categoryById) {
  return res.status(400).json( {error: `Unable to find category. ID: ${id}`});
}
res.status(200).json(categoryById);
}
catch (e) { res.status(400).json(e)
}
});

//create a new category
router.post('/', async (req, res) => {
  let { category_name } = req.body;
  try {
    if (!category_name) {
      return res.status(400).json({ error: `enter a valid category`});
  }
  category_name = category_name.trim();
  const newCategory = await Category.create({ category_name});
  res.json(newCategory);
}
catch (e) {
  res.status(400).json(e);
}
});
// update category by id
router.put('/:id', async (req, res) => {
const { id } = req.params;
let { category_name } = req.body;
try {
  await Category.update({ category_name }, { where: { id }});
  const categoryById = await Category.findOne( { where: { id }});
  if (!categoryById){
    return res.status(400).json({ error: `There is no category with this id`});
  }
  res.json(categoryById);
} catch (e) {
  res.status(400).json(e);
} });

// delete categories by id
router.delete('/:id', async (req, res) => {
 const { id } = req.params;
 try { 
   const categoryById = await Category.findOne({ where: { id }});
   if (!categoryById) {
     return res.status(400).json({ error: `There is an issue with this category.`});
   }
   await Category.destroy({ where: {id} });
   res.status(200).json({ Deleted: categoryById});

   }
   catch (e) {
     res.status(400).json(e);
   }
});



module.exports = router;
