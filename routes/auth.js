const router = require('express').Router();
const passport = require('passport');

router.get('/login', (_req, res, _next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
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

module.exports = router;