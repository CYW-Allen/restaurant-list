const router = require('express').Router();
const restaurantRoutes = require('./restaurants');

router.use('/restaurants', restaurantRoutes);
router.get('/', (_req, res) => {
  res.redirect('/restaurants');
});

module.exports = router;