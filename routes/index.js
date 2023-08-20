const router = require('express').Router();

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const restaurantRoutes = require('./restaurants');
const checkAuth = require('../middlewares/auth-handler');

router.get('/', (_req, res) => {
  res.redirect('/restaurants');
});
router.use(authRoutes);
router.use('/users', usersRoutes);
router.use('/restaurants', checkAuth, restaurantRoutes);

module.exports = router;