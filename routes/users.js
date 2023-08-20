const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models').User;
const verifyUserForm = require('../middlewares/user-form-handler');

router.post('/', verifyUserForm, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;


    await User.create({ name, email, password: await bcrypt.hash(password, 10) });
    req.flash('success', '註冊成功');
    res.redirect('/login');
  } catch (e) {
    e.alertMsg = e.name === 'SequelizeUniqueConstraintError'
      ? '此信箱已註冊' : '註冊失敗';
    next(e);
  }
});

module.exports = router;