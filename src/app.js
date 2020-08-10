const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Rushabh Parekh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rushabh Parekh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Help contents',
        name: 'Rushabh Parekh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        foreCast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error: error
                })

            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location: location
            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Rushabh Parekh',
        msg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rushabh Parekh',
        msg: 'The page not found'
    })
})

app.listen(3000, () => {
    console.log("Server is up")
})