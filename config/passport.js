const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook');
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

passport.use(new FacebookStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: process.env.FB_CB_URL,
  profileFields: ['email', 'displayName'],
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const name = profile.displayName;

  try {
    const user = await User.findOne({
      attributes: ['id', 'name', 'email'],
      where: { email },
      raw: true,
    });

    if (user) done(null, user);
    else {
      const hash = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
      const newUser = await User.create({ name, email, password: hash });
      done(null, { id: newUser.id, name: newUser.name, email: newUser.email });
    }
  } catch (err) {
    err.alertMsg = 'FB登入失敗';
    done(err);
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