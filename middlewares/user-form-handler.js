function examineEmailStr(email) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
}

module.exports = (req, res, next) => {
  const input = req.body;

  if (!input.email || !input.password) {
    req.flash('fail', '信箱及密碼為必填');
    return res.redirect('back');
  }
  if (!input.confirmPwd || input.password !== input.confirmPwd) {
    req.flash('fail', '驗證密碼與密碼不符');
    return res.redirect('back');
  }
  if (!examineEmailStr(input.email)) {
    req.flash('fail', '信箱格式錯誤');
    return res.redirect('back');
  }
  next();
}