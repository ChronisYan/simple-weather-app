const request = require("request");
require("dotenv").config();
const key = process.env.DARKSKY_KEY;
const forecast = (lat, log, callback) => {
  const url = `https://api.darksky.net/forecast/${key}/${encodeURIComponent(
    lat
  )},${encodeURIComponent(log)}?units=si`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Oops! Unable to connect to service, try again later");
    } else if (response.body.error) {
      callback("Oops! Unable to find location, try another search");
    } else {
      callback(undefined, {
        daily: response.body.daily.data[0].summary,
        icon: response.body.daily.data[0].icon,
        currentTemperature: response.body.currently.temperature,
        currentPrecipProbability: response.body.currently.precipProbability,
      });
    }
  });
};

module.exports = forecast;
