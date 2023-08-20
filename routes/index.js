const router = require('express').Router();
const passport = require('passport');
const usersRoutes = require('./users');
const restaurantRoutes = require('./restaurants');
const checkAuth = require('../middlewares/auth-handler');

router.get('/', (_req, res) => {
  res.redirect('/restaurants');
});

router.use('/restaurants', checkAuth, restaurantRoutes);

router.get('/login', (_req, res, _next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.post('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      err.alertMsg = '登出失敗';
      return next(err);
    }
    res.redirect('/login');
  })
});

router.get('/register', (_req, res, _next) => {
  res.render('register');
});

router.use('/users', usersRoutes);

module.exports = router;