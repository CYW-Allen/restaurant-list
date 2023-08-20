const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models').User;

passport.use(new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
  try {
    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'password'],
      where: { email: username },
      raw: true,
    });

    if (!user) return done(null, false, { type: 'fail', message: '信箱錯誤' });
    
    if (user.password === password) {
      const hash = await bcrypt.hash(password, 10);
      await User.update({ password: hash }, { where: { email: username } });
      user.password = hash;
      return done(null, user);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { type: 'fail', message: '密碼錯誤' });
    
    done(null, user);
  } catch (e) {
    e.alertMsg = '登入失敗';
    done(e);
  }
}));

passport.serializeUser((user, done) => {
  const { id, name, email } = user;
  done(null, { id, name, email });
});

passport.deserializeUser((user, done) => {
  done(null, { id: user.id });
})

module.exports = passport;