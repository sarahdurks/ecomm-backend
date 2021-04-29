const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const { restore } = require("../../models/Tag");

// The `/api/tags` endpoint
//? PRODUCT TAG?
// Find all tags and return product data
router.get("/", async (req, res) => {
  try {
    const allTags = await Tags.findAll({ include: [Product]});
    res.status(200).json(allTags);
  }
 catch (e) {
  res.status(400).json(e);
 }
});

// Find tag by id and return product data
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tagById = await Tag.findOne({ where: { id }, include: [Product] });
    if (!tagById) {
      return res.status(400).json({ error: ``});
    }
    res.status(200).json(tagById);
  }
  catch (e) {
    res.status(400).json(e);
  }
});

// Create new tag
router.post("/", async (req, res) => {
  let { tag_name } = req.body;
  try {
    tag_name = tag_name.trim();
    const newTag = await Tag.create({ tag_name});
  
  res.json(newTag);
} catch (e) {
  res.status(400).json(e);
}
});
// update tag name by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let { tag_name } = req.body;
  try {
    await Tag.update({ tag_name }, { where: { id } });
    const tagById = await Tag.findOne({ where: { id } });
    if (!tagById) {
      return res.status(400).json({ error: `404` });
    }
    res.json(tagById);
  } catch (e) {
    res.status(400).json(e);
  }
});

// Delete tag by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tagById = await Tag.findOne({ where: { id } });
    if (!tagById) {
      return res.status(400).json({ error: `error` });
    }
    await Tag.destroy({ where: { id } });
    res.status(200).json({ Deleted: tagById });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
