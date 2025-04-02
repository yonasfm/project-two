const mongoose = require('mongoose')

const videoGameSchema = new mongoose.Schema ({
    gameName: String, 
    gameSystem: String
})

// Creates model in MongoDB
const videoGame = mongoose.model("Videogame", videoGameSchema)

module.exports = videoGame
