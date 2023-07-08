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
app.get('/restaurants', (_req, res) => {
  res.render('index', { restaurants });
});
app.get('/restaurant/:id', (req, res) => {
  res.render('detail', {
    restaurant: restaurants.find((r) => r.id === Number(req.params.id))
  });
})

app.listen(SERVER_PORT, () => {
  console.log(`The server is running on http://localhost:${SERVER_PORT}`);
});