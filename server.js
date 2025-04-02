const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const dotenv = require('dotenv')

const videoGame = require('./models/game-titles.js')


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
app.get('/', (req, res) => {
    res.render('home.ejs');
});


// Console Selection Page
app.get('/consoles', (req, res) => {
    res.render('consoles/consoles.ejs')
})

// Search by Game/Title Page
app.get('/search-games', (req, res) => {
    res.render('search.ejs', {
        results : ""
    }
    )
})

// Searches Game and Console and renders results
app.post('/search', async (req, res) => {
    const titleSelect = req.body.gameName
    const consoleSelect = req.body.gameSystem
    console.log(titleSelect, consoleSelect)

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
    
    console.log(selection)
    // Query the database for games and consoles that matches selection
    const allGames = await videoGame.find({gameName : selection.gameName, gameSystem: selection.gameSystem })
    console.log(allGames)

    // Renders search results page with the chosen game and console
    res.render('search.ejs', {
        results: allGames,
        searchResults: {gameName: titleSelect, gameSystem : consoleSelect}   
     })
})



// Delete Game from Selection
app.delete('/search/:gameId', async (req, res) => {
        const gameId = req.params.gameId;
        await videoGame.findByIdAndDelete(gameId); // Delete the game by its ID
        res.redirect('/search-games'); // Redirect to the search page after deletion
});

// Edit Chosen Game Page
app.get('/search/:gameId/edit', async (req, res) => {
    const chosenGame = await videoGame.findById(req.params.gameId)
    res.render('edit-game.ejs', {
    game: chosenGame
})
})

// Update Chosen Game after Editing It
app.put('/search/:gameId', async (req, res) => {
    await videoGame.findByIdAndUpdate(req.params.gameId, req.body)
    res.redirect('/search-games')
})

// Signup Form
app.get('/signup/new', (req, res) => {
    res.render('signup.ejs')
})


// Playstation Home Page
app.get('/consoles/playstation', (req, res) => {
    res.render('consoles/playstation.ejs')
})

// Xbox Home Page
app.get('/consoles/xbox', (req, res) => {
    res.render('consoles/xbox.ejs')
})

// Nintendo Home Page
app.get('/consoles/nintendo', (req, res) => {
    res.render('consoles/nintendo.ejs')
})

// Steam Home Page
app.get('/consoles/steam', (req, res) => {
    res.render('consoles/steam.ejs')
})


// Listening Port
app.listen(3300, () => {
    console.log('Listening on Port 3300')
})

