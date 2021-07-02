const request = require('request');

const forecast = (coordinates, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3cc6efc0ce813a6f4df9a096b0ebcdf5&query=${coordinates}`

request({
  url: url,
  json: true
}, (e, res) => {
  if (e) {
    callback("No connection", undefined)
  }
  else if (res.body.error) {
    callback("Not found", undefined)
  }
  else {
  let temp = res.body.current.temperature;
  let feelLike = res.body.current.feelslike;
  let msg = `its currently ${temp} degrees out. Fells like ${feelLike}`;
  callback(undefined, msg)
  }

})
}

module.exports = forecast