// Product Routes //
// Dependencies
const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");
// GET
// Get all Proeducts
router.get("/", async (req, res) => {
  try {
    const allProduct = await Product.findAll({ include: [Category, Tag] });
    res.status(200).json(allProduct);
  } catch (e) {
    res.status(400).json(e);
  }
});
// GET
// Get one Product by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await Product.findOne({
      where: { id },
      include: [Category, Tag],
    });
    if(!productById) {
      return res.status(400).json({ error: `issue getting product ${id} by ID` });
    }
    res.status(200).json(productById);
  } catch (e) {
    res.status(400).json(e);
  }
});
// POST
// Create product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      tagIds: req.body.tagIds,
    });
    if(req.body.tagIds.length) {
      const productTagIdArray = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      const tagId = await ProductTag.bulkCreate(productTagIdArray);
    }
    res.status(200).json(product);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});
// PUT
// Updates product data
router.put("/:id", async (req, res) => {
  try {
    await
    Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds.filter((tag_id) => !productTagIds.includes(tag_id)).map((tag_id) => {
      return {
        product_id: req.params.id,
        tag_id,
      };
    });
    const productTagsRemove = productTags.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id)).map(({ id }) => id);
    const updateProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
    const productById = await Product.findOne({ where: { id: req.params.id }, include: [Category, Tag] });
    res.json({ productById, updateProductTags })
  } catch (e) {
    res.status(400).json({ error: e })
  }
});
// DELETE
// Delete one product by id
router.delete("/:id", async (req, res) => {
  try {
    const productData = Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!productData) {
      res.status(404).json({ message: "Product not found to delete" });
      return;
    }
    res.json(productData);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});
module.exports = router;