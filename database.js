const mongoose = require('mongoose')
const dotenv = require('dotenv')
const videoGame = require('./models/game-systems.js')

dotenv.config()

const playstationGames = [
    { gameName: "Astro Bot", gameSystem: "PS5"},
    { gameName: "God of War", gameSystem: "PS4"},
    { gameName: "God of War: Ragnarok", gameSystem: "PS5"},
    { gameName: "Ratchet and Clank: Rift Apart", gameSystem: "PS5"},
    { gameName: "The Last of Us Part 1", gameSystem: "PS5"},
    { gameName: "Horizon Zero Dawn", gameSystem: "PS4"},
    { gameName: "Horizon Zero Dawn: Forbidden West", gameSystem: "PS5"},
    { gameName: "Ghost of Tsushima", gameSystem: "PS4"},
    { gameName: "Ghost of Tsushima: Director's Cut", gameSystem: "PS5"},
    { gameName: "Marvel's Spiderman 2", gameSystem: "PS5"},

];

async function GamesDatabase() {
    await videoGame.deleteMany() // Clears previous database data before inserting new data
    await videoGame.insertMany(playstationGames) // Inserts Game and Console data array
    console.log(`Database reached!`)
    await mongoose.connection.close() // Closes connection 
    console.log(`Database closed.`)
}

GamesDatabase().catch(error => console.error('Error:', error.message))

