const express = require('express');
const { engine } = require('express-handlebars');
const restaurants = require('./public/data/restaurant.json').results;

const app = express();
const SERVER_PORT = 3000;

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.redirect('/restaurants');
});
app.get('/restaurants', (req, res) => {
  const keyword = req.query.keyword?.trim()?.toLowerCase();
  res.render('index', {
    restaurants: keyword ? restaurants.filter((rest) => (
      [rest.name, rest.category].some((content) => content.toLowerCase().includes(keyword))
    )) : restaurants,
    keyword: req.query.keyword
  });
});
app.get('/restaurant/:id', (req, res) => {
  res.render('detail', {
    restaurant: restaurants.find((r) => r.id === Number(req.params.id))
  });
})

app.listen(SERVER_PORT, () => {
  console.log(`The server is running on http://localhost:${SERVER_PORT}`);
});