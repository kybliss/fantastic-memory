const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Error in retrieving tags.' });
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag_id = req.params.id;
    const tag = await Tag.findByPk(tag_id);

    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json( {error: 'Tag not found. '});
    }
  } catch (error) {
    res.status(500).json({ error: 'Error in locating tag.' });
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { name, description } = req.body;

    const newTag = await Tag.create({
      name,
      description,
    });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: 'Error in creating a new tag.' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tag_id = req.params.id;
    const { name } = req.body;

    const tag = await Tag.findByPk(tag_id);

    if (tag) {
      tag.name = name;
      await tag.save();

      res.json(tag);
    } else {
      res.status(404).json({ error: 'Error in locating tag.' });
    } 
  } catch (error) {
    res.status(500).json({ error: 'Error in updating tag.' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag_id = req.params.id;
    const tag = await Tag.findByPk(tag_id);

    if (tag) {
      await tag.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Error in locating tag.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error in deleting tag.' });
  }
});

module.exports = router;
