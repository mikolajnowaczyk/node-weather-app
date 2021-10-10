const path = require("path");
const express = require("express");
const hbs = require("hbs", );
const geocode = require("./utils/geocode");
const weathercode = require("./utils/weathercode");

const app = express();
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

// Setup handlers engine and views location
app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// Setup static directory to serve
app.get("", (req, res)=>{
  res.render('index', {
    title: "Weather hbs",
    name: "Mikolaj"
  });
})

app.get("/about", (req, res)=>{
  res.render('about', {
    title: "About Me HBS",
    name: "Mikolaj"
  });
})

app.get("/help", (req, res)=>{
  res.render('help', {
    title: "Help page",
    message: "Example help message",
    name: "Mikolaj"
  });
})

app.get("/weather*", (req, res) => {
  // console.log(req);
  if(!req.query.adress){
    console.log("!req.query.adress", !req.query.adress, req.query.adress);
    res.send({
      error:"Provide an adress!"
    });
  }else{
    geocode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      weathercode(latitude , longitude, (error, response) => {
        if (error) {
          return res.send({
            error
          });
        }
        {
          res.send({
            adress: req.query.adress,
            location,
            forecast: response
          })
        }
      });
    });
  };
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message404: "Help artice not found!",
    name: "Mikolaj",
    title: "Something went wrong!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message404: "Page not found!",
    name: "Mikolaj",
    title: "Something went wrong!"
  });
});

app.listen(3000, () => {
  console.log("Server started!");
});
