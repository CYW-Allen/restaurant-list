module.exports = (req, res, next) => {
  const input = req.body;
  const inputName = input?.name?.replace(/\s/g, '');
  const inputLocation = input?.location?.replace(/\s/g, '');

  if (!inputName || !inputName.length) {
    req.flash('fail', '無效的餐廳名稱');
    return res.redirect('back');
  }
  if (!inputLocation || !inputLocation.length) {
    req.flash('fail', '無效的餐廳地址');
    return res.redirect('back');
  }
  next();
}