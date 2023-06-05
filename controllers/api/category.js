const router = require('express').Router();
const { Post, User, PostCategory, Category } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll();

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id);

    if (!catData) {
      res.status(404).json('no category found with this id');
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const catData = await Category.create(req.body);

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const catData = await Category.update(req.body);

    if (!catData) {
      res.status(400).json({ message: 'No category found to update.' });
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({ where: { id: req.params.id } });

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Category;
