const router = require('express').Router();
const tools = require('../utils/dbOperation');

router.get('/', (_req, res) => {
  res.redirect('/restaurants');
});

router.get('/restaurants', async (req, res, next) => {
  try {
    const keyword = req.query.keyword?.trim()?.toLowerCase();
    const restaurants = await tools.listRestaurnats(keyword) || [];

    res.render('index', { restaurants, keyword: req.query.keyword });
  } catch (e) {
    next(e);
  }
});

router.get('/restaurants/new', (_req, res) => {
  res.render('form');
});

router.get('/restaurants/:id', async (req, res, next) => {
  try {
    const restaurant = await tools.getRestaurant(req.params.id);

    res.render('detail', { restaurant });
  } catch (e) {
    next(e);
  }
});

router.get('/restaurants/:id/edit', async (req, res, next) => {
  try {
    const restaurant = await tools.getRestaurant(req.params.id);

    res.render('form', { restaurant } );
  } catch (e) {
    next(e);
  }
});

router.post('/restaurants', async (req, res, next) => {
  try {
    const restaurantId = await tools.insertRestaurant(req.body);

    res.redirect(`/restaurants/${restaurantId}`);
  } catch (e) {
    next(e);
  }
});

router.put('/restaurants/:id', async (req, res, next) => {
  try {
    await tools.updateRestaurant(req.params.id, req.body);
    res.redirect(`/restaurants/${req.params.id}`);
  } catch (e) {
    next(e);
  }
});

router.delete('/restaurants/:id', async (req, res, next) => {
  try {
    await tools.deleteRestaurant(req.params.id);
    res.redirect('/restaurants');
  } catch (e) {
    next(e);
  }
});

module.exports = router;