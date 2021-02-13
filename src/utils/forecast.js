const request = require('postman-request');

const forecast = ({ longitude, latitude }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=85310f941c9e13785a8f0911bce69d50&query=${longitude},${latitude}&units=m`;

  request({ url, json: true }, (error, response, body) => {

    if (error) {
      callback('Unable to connect to web service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    }
    else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. it feel like ${feelslike} degrees out`)
    }

  });
}


module.exports = forecast;