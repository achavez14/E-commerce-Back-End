const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // Include Product data
    include: [{ model: Product }]
  })
  .then((tags) => {
    res.json(tags);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: { id: req.params.id },
    // Include Product data
    include: [{ model: Product }]
  })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id }
  })
  .then((result) => {
    if (result[0] === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json({ message: 'Tag updated succesfully' });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id }
  })
  .then((result) => {
    if (result === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json({ message: 'Tag deleted successfully' });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
