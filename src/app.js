const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forcast')

const app = express()
const port = process.env.PORT || 3000
//defaine path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup headbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static path to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'weather App',
        name : 'Sunil kumar',
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About page weather App',
        name : 'Sunil kumar',
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help page weather App',
        message : 'This is a message for help page',
        name : 'Sunil kumar',
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error : 'You must provide search term'
        })
    }    
    console.log(req.query)
    res.send({
        products :[],
    })
    
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : ' You must provide address term '
        })
    }

    geocode( req.query.address, ( error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address ,
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        'title' : '404 Help',
        'name' : 'Sunil kumar',
        'errorMessage' : 'Help Article  not found !',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title' : '404',
        'name' : 'Sunil kumar',
        'errorMessage' : 'Page Not Found !',
    })
})





app.listen(port, () => {
    console.log('serever in up on port '+ port)
})