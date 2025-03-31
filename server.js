const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const videoGame = require('./models/game-systems.js')

dotenv.config()

const app = express()
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))

// Home Page
app.get('/', (req, res) =>{
    res.render('home.ejs')
})

// Console Selection Page
app.get('/video-games', (req, res) => {
    res.render('video-games/consoles.ejs')
})

// Search by Game/Title Page
app.get('/search-games', (req, res) => {
    res.render('search.ejs')
})

// Searches Game and Console and renders results
app.post('/search', async (req, res) => {
    const titleSelect = req.body.gameName
    const consoleSelect = req.body.gameSystem
    
    // Stores title and console selection
    const selection = {}

    // Adds chosen title to selection query
    if (titleSelect) {
        selection.gameName = titleSelect
    }

    // Adds chosen console to selection query
    if (consoleSelect) {
        selection.gameSystem = consoleSelect
    }

    // Query the database for games and consoles that matches selection
    const allGames = await videoGame.find(selection)

    // Renders search results page with the chosen game and console
    res.render('search.ejs', {
        results: allGames,
        searchResults: {gameName: titleSelect, gameSystem : consoleSelect}   
     })
})


// Playstation Home Page
app.get('/video-games/playstation', (req, res) => {
    res.render('video-games/playstation.ejs')
})

// Xbox Home Page
app.get('/video-games/xbox', (req, res) => {
    res.render('video-games/xbox.ejs')
})

// Nintendo Home Page
app.get('/video-games/nintendo', (req, res) => {
    res.render('video-games/nintendo.ejs')
})

// Steam Home Page
app.get('/video-games/steam', (req, res) => {
    res.render('video-games/steam.ejs')
})


// Listening Port
app.listen(3200, () => {
    console.log('Listening on Port 3200')
})

