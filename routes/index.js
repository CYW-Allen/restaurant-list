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
  res.send(`Get page of new restaurnat`);
});

router.post('/restaurants', async (req, res, next) => {
  res.send(`Create new restaurnat`);
});

router.get('/restaurants/:id', async (req, res, next) => {
  try {
    const restaurant = await tools.getRestaurant(req.params.id);

    res.render('detail', { restaurant });
  } catch (e) {
    next(e);
  }
});

router.get('/restaurants/:id/edit', (req, res) => {
  res.send(`Get page of modifing restaurnat ${req.params.id} information`);
});

router.put('/restaurants/:id', async (req, res, next) => {
  res.send(`Modify restaurnat ${req.params.id} information`);
});

router.delete('/restaurants/:id', async (req, res, next) => {
  res.send(`Delete restaurnat ${req.params.id}`);
});

module.exports = router;