var express = require('express');
var router = express.Router();
const Game = require("../models/Game");
var bcrypt = require("bcryptjs");


//Add Game Method - Currently Only Accessible Through Post Request
router.post('/add', async function(req, res, next) {

  //Gets the data from the response body
  const { name, platform, genre, releaseDate, numPlayers, publisher, boxArt} = req.body;

  //Creates a new model
  const game = new Game({
    name: name,
    platform: platform,
    genre: genre,
    releaseDate: releaseDate,
    numPlayers: numPlayers,
    publisher: publisher,
    boxArt: boxArt,
  });

  //Attempts to save it
  try{
    await game.save();
    res.status(201).send("Game Added");
  }
  catch (error){
    res.status(500).send({error: `${error}: Error adding game`});
  }

});

//Get Game Method - Takes A Game Id And Finds It
router.get('/get/:id', async function(req, res, next) {
  var id = req.params.id;
  var game = await Game.findById(id)

  res.send(game);
});

//Get All Games Method - Returns All Game Data
router.get('/getAll', async function(req, res, next) {
  var games = await Game.find();

  res.send(games);
});


module.exports = router;
