const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//HBS CONFIG PATHS
const publicDirPath = path.join(__dirname, '../public')
const templateDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

// HBS SETUP
app.set('view engine', 'hbs')
app.set('views', templateDirPath)
hbs.registerPartials(partialsDirPath)

//ROUTING 
app.use(express.static(publicDirPath))

app.get('/', (req, res)=>{
    res.render('index',{
        title: 'Simple Weather App',
        introText: "Welcome to this little nodeJs app!",
        author: 'Steve the man'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Page',
        author: 'Steve the man'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'Yo need help',
        author: 'Steve the man'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({error: 'You need to provide an address'})
    }
    geocode(req.query.address,(error,{location, latitude, longitude} = {})=>{
        if(error){
           return res.send({error})
        }
        forecast(latitude,longitude,(error, {daily, icon,currentPrecipProbability, currentTemperature})=>{
            if(error){
                return res.send({error})
             }
             res.send({
                forecast: `${daily}<br> Currenlty, the temperature is ${currentTemperature} degrees.<br> There is ${currentPrecipProbability}% chance of rain.`,
                location,
                icon,
                address: req.query.address
            })
        })
    }) 
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        mainContent: 'Help article not found',
        author: 'Steve the man'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        mainContent: 'Page not found',
        author: 'Steve the man'
    })
})


//STARTING THE SERVER

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
}) 
