const mongoose = require('mongoose');

//Game Model
const GameSchema = mongoose.Schema({
    name: {type: String, required: true},
    platform: {type: String, required: true},
    genre: {type: String, required: true},
    releaseDate: {type: Date, required: true}, 
    numPlayers: {type: Number, required: true}, 
    publisher: {type: String, required: true}, 
    boxArt: {type: String, required: true}, 
});

module.exports = mongoose.model("Game", GameSchema);