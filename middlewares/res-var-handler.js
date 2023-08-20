module.exports = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.successMsg = req.flash('success');
  res.locals.errorMsg = req.flash('fail');
  next();
};