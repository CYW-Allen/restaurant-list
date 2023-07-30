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
  /*
  res.render('index', {
    restaurants: keyword ? restaurants.filter((rest) => (
      [rest.name, rest.category].some((content) => content.toLowerCase().includes(keyword))
    )) : restaurants,
    keyword: req.query.keyword
  });
  */
});

router.get('/restaurant/:id', async (req, res, next) => {
  try {
    const restaurant = await tools.getRestaurant(req.params.id);

    res.render('detail', { restaurant });
  } catch (e) {
    next(e);
  }
  /*
  res.render('detail', {
    restaurant: restaurants.find((r) => r.id === Number(req.params.id))
  });
  */
});

module.exports = router;