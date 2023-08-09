const express = require('express');
const { create } = require('express-handlebars');
const methodOverride = require('method-override');
const router = require('./routes/index');
const { errHandler } = require('./utils/tools');

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
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`The dev server is running on http://localhost:${PORT}`);
});