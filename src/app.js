const path = require('path')
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");
const express = require('express')
const hbs = require('hbs')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "../public")));
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath= path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather app",
    name: "Vladimir"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Vladimir",
    info: "Info about me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Vladimir",
    help: "Help info",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide an address"
    })
  }

  geocode(req.query.address, (error,{lat, long, location}={}) => {
      if (error) {
        return res.send({error});
    }
    const coordinates = `${lat},${long}`;
      forecast(coordinates, (error, dataForecast) => {
        if (error) {
          return res.send({ error });
        }
          res.send({
            forecast: dataForecast,
            location: location,
            address: req.query.address,
          });
      });
  })


});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    })
  }
  res.send({
    products: ['qqq','eee'],
  });
  
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vladimir",
    errorMessage: "Question not found",
  });
});

app.get('*', (req, res) => {
    res.render("404", {
      title: "404",
      name: "Vladimir",
      errorMessage: "Page not found",
    });
})

app.listen(port, () => {
  console.log('Server is up');
})