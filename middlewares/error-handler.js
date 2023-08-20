module.exports = (error, req, res, _next) => {
  console.error(error);
  req.flash('fail', error.alertMsg || 'Internal server error');
  res.redirect('back');
}