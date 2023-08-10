const router = require('express').Router();
const Restaurant = require('../models').Restaurant;
const { Op } = require('sequelize');
const { examineInput, sanitizeInput } = require('../utils/tools')

router.get('/', async (req, res, next) => {
  try {
    const keyword = req.query.keyword?.trim()?.toLowerCase();
    const restaurants = await Restaurant.findAll({
      raw: true,
      ...(keyword && {
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${keyword}%` } },
            { category: { [Op.like]: `%${keyword}%` } },
          ]
        }
      })
    });

    res.render('index', { restaurants, keyword: req.query.keyword });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/new', (_req, res) => {
  res.render('form');
});

router.get('/:id', async (req, res, next) => {
  try {
    res.render('detail', { 
      restaurant: await Restaurant.findByPk(req.params.id, { raw: true }),
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    res.render('form', { 
      restaurant: await Restaurant.findByPk(req.params.id, { raw: true }),
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const restaurantForm = req.body;

    examineInput(restaurantForm);
    res.redirect(`/restaurants/${(await Restaurant.create(sanitizeInput(restaurantForm))).id}`);
  } catch (e) {
    if (e.name !== 'invalidInput') console.error(e);
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const restaurantForm = req.body;

    examineInput(restaurantForm);
    await Restaurant.update(sanitizeInput(restaurantForm), { where: { id } });
    res.redirect(`/restaurants/${id}`);
  } catch (e) {
    if (e.name !== 'invalidInput') console.error(e);
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Restaurant.destroy({ where: { id: req.params.id } });
    res.redirect('/restaurants');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;