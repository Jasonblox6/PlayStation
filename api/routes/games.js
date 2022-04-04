var express = require('express');
var router = express.Router();
const Game = require("../models/Game");
var bcrypt = require("bcryptjs");

router.post('/add', async function(req, res, next) {

  const { name, platform, genre, releaseDate, numPlayers, publisher, boxArt} = req.body;
  const game = new Game({
    name: name,
    platform: platform,
    genre: genre,
    releaseDate: releaseDate,
    numPlayers: numPlayers,
    publisher: publisher,
    boxArt: boxArt,
  });
  try{
    await game.save();
    res.status(201).send("Game Added");
  }
  catch (error){
    res.status(500).send({error: `${error}: Error adding game`});
  }

});

router.get('/get/:id', async function(req, res, next) {
  var id = req.params.id;
  var game = await Game.findById(id)

  res.send(game);
});

router.get('/getAll', async function(req, res, next) {
  var games = await Game.find();

  res.send(games);
});


module.exports = router;
