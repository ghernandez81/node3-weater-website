const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;
const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Gabriel Hernandez'
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About me', name: 'Gabe Hernandez' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Gabriel Hernandez',
    message: 'Your problem is you, so my question how can i help you'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'There is no address in the query silly goose' });
  }

  geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast({ longitude, latitude }, (error, foreCaseData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: foreCaseData,
        location: location,
        address: req.query.address
      });
    });
  });

});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You moust provide a search term' });
  }
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404-error', {
    msgError: 'Help Article not found',
    name: 'Gabriel Hernandez',
  });
});

app.get('*', (req, res) => {
  res.render('404-error', {
    msgError: 'Page not found',
    name: 'Gabriel Hernandez',
  });
});

app.listen(port, () => {
  console.log(`Server is up port ${port}`);
});