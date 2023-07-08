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
  res.send(`
    There are total ${restaurants.length} restaurants in the list.<br>
    List: [${restaurants.map((r) => r.name).join(',')}]
  `);
});
app.get('/restaurant/:id',(req, res) => {
  const reqRestaurant = restaurants.find((r) => r.id === Number(req.params.id));
  res.send(`
    The reataurant name: ${reqRestaurant.name}<br>
    Description: ${reqRestaurant.description}
  `);
})

app.listen(SERVER_PORT, () => {
  console.log(`The server is running on http://localhost:${SERVER_PORT}`);
});