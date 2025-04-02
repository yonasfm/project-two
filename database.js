const mongoose = require('mongoose')
const dotenv = require('dotenv')
const videoGame = require('./models/game-titles.js')
const userLogin = require('./models/user.js')
dotenv.config()

const consoleGames = [
    { gameName: "Astro Bot", gameSystem: "PS5"},
    { gameName: "God of War", gameSystem: "PS5"},
    { gameName: "Ratchet and Clank", gameSystem: "PS5"},
    { gameName: "The Last of Us", gameSystem: "PS5"},
    { gameName: "Horizon Zero Dawn", gameSystem: "PS5"},
    { gameName: "Horizon Zero Dawn: Forbidden West", gameSystem: "PS5"},
    { gameName: "Ghost of Tsushima", gameSystem: "PS5"},
    { gameName: "Spiderman 2", gameSystem: "PS5"},
    { gameName: "Minecraft", gameSystem: "Xbox Series X"},
    { gameName: "Tekken 8", gameSystem: "Xbox Series X"},
    { gameName: "Assassins Creed: Shadows", gameSystem: "Xbox Series X"},
    { gameName: "Call of Duty: Black Ops 6", gameSystem: "Xbox Series X"},
    { gameName: "Split Fiction", gameSystem: "Xbox Series X"},
    { gameName: "Red Dead Redemption 2", gameSystem: "Xbox Series X"},
    { gameName: "GTA 5", gameSystem: "Xbox Series X"},
    { gameName: "Mario Kart 8 Deluxe", gameSystem: "Nintendo Switch"},
    { gameName: "Super Smash Bros: Ultimate", gameSystem: "Nintendo Switch"},
    { gameName: "Super Mario Bros: Wonder", gameSystem: "Nintendo Switch"},
    { gameName: "The Legend of Zelda: Tears of the Kingdom", gameSystem: "Nintendo Switch"},
    { gameName: "The Legend of Zelda: Breath of the Wild", gameSystem: "Nintendo Switch"},
    { gameName: "Kirby and the Forgotten Land", gameSystem: "Nintendo Switch"},
    { gameName: "Donkey Kong Country: Tropical Freeze", gameSystem: "Nintendo Switch"},
    { gameName: "Super Mario Odyssey", gameSystem: "Nintendo Switch"},
    { gameName: "Baldur's Gate 3", gameSystem: "Steam"},
    { gameName: "The Witcher 3: Wild Hunt", gameSystem: "Steam"},
    { gameName: "Elden Ring", gameSystem: "Steam"},
    { gameName: "Helldivers 2", gameSystem: "Steam"},
    { gameName: "Enshrouded", gameSystem: "Steam"},
    { gameName: "Apex Legendes", gameSystem: "Steam"},
    { gameName: "Fragpunk", gameSystem: "Steam"},
    { gameName: "Destiny 2", gameSystem: "Steam"}
];


async function seedDatabase() {
    mongoose.connect(process.env.MONGODB_URI)
    await videoGame.deleteMany() // Clears previous database data before inserting new data
    await videoGame.insertMany(consoleGames) // Inserts Game and Console data array
    console.log(`Database reached!`)
    await mongoose.connection.close() // Closes connection 
    console.log(`Database closed.`)
}

seedDatabase().catch(error => console.error('Error:', error.message))

