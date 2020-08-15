const request = require('request')
const { error } = require('console')

const foreCast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=07049a3ce38216042992f935638182ee&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback("Unable to connect to weather servces.", undefined)
        } else if (body.error) {
            callback("Unable to find location.", undefined)

        } else {
            callback(undefined, {
                Description: body.current.weather_descriptions[0] + ",Temp : " + body.current.temperature + ", Humidity " + body.current.humidity + "%",
                temp: body.current.temperature,
                feel_temp: body.current.feelslike
            })
        }

    })

}

module.exports = foreCast