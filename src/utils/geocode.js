const request = require("request");

const geocode = (city, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(city) +
    ".json?access_token=pk.eyJ1IjoibWlraTEyMzMyMSIsImEiOiJja29haW1leXoxemh3MnhteWRjN2Nlem15In0.Dagy8p5tHC1Ko3OBe4CtTg";
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to the server!", undefinded);
    } else if (body.features.length === 0) {
      callback("Couldn't find any location. Try another one!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
