const request = require("request");

const weathercode = (latitude, longitude, callback) => {
  console.log("Long", longitude);
  console.log("Lat", latitude);
  const url =
    "http://api.weatherstack.com/current?access_key=9450034e432b8b25193c0528f03c0b04&query=" +
    longitude +
    "," +
    latitude +
    "&units=m";
  request({ url, json: true }, (error, { body}) => {
    if (error) {
      callback("Something went wrong!", undefined);
    } else {
      callback(undefined,
          "It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = weathercode;
