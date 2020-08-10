const request = require('request')


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnVzaHVwYXJla2giLCJhIjoiY2tkZmpxOWtlMXM1aTMzbDBnenBxbmZiNiJ9.a1K6IeJ7khZvBlsMadcnXg&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to mapbox servces.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode