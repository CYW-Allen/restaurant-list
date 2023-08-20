const express = require('express');
const { create } = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

require('dotenv').config();
const passport = require('./config/passport');
const router = require('./routes/index');
const resVarHandler = require('./middlewares/res-var-handler');
const errHandler = require('./middlewares/error-handler');

const app = express();
const hbs = create({
  extname: '.hbs',
  helpers: {
    formAction: (data) => data ? `/restaurants/${data.id}?_method=PUT` : '/restaurants',
    initRating: (data) => data || 5,
    jsonStr: (context) => JSON.stringify(context),
  },
})
const PORT = process.env.PORT || 3000;

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(resVarHandler)
app.use(router);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});