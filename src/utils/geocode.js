const request = require("request");
require("dotenv").config();
const key = process.env.MAPBOX_KEY;
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/
    ${encodeURIComponent(address)}.json?access_token=${key}&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Oops! Unable to connect to service, try again later");
    } else if (response.body.features.length === 0) {
      callback("Oops! Unable to find location, try another search");
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
