const request = require('request');


const geocode = (address, callback) => {
  const position = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmxhZGltaXJzcGxvdG5pa292IiwiYSI6ImNrcWtxbnV0NzBuejIyb254NmU1Z3JmbjEifQ.bJRp6xtbAtQSHeYtMPgREw&limit=1`;

request({
  url: position,
  json: true
}, (e, res) => {
    if (e) {
    callback("No connection", undefined)
  }
    else if (res.body.features.length === 0) {
      callback('Nothing found', undefined);
  }
    else {
  const long = res.body.features[0].center[0];
      const lat = res.body.features[0].center[1];
      location = res.body.features[0].place_name
  callback(undefined, {long, lat, location})
  }

})
}
module.exports = geocode