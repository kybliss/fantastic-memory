const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: Product,
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in retrieving categories.' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryId = req.params.id;

  try {
    const cateogry = await Category.findByPk(categoryId, {
      include: Product,
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in retrieving categories.' })
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const { categoryName } = req.body;

  try {
    const newCategory = await Category.create({
      category_name: categoryName,
    });
    
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in creating category.' })
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.id;
  const { categoryName } = req.body;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    category.category_name = categoryName;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in updating category.' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();

    res.status(204).end;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in deleting category.' });
  }
});

module.exports = router;
