var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const User = require("../models/User");
var bcrypt = require("bcryptjs");


router.post('/login', async function(req, res, next) {
  try{
    const user = await User.findOne({username:req.body.username})
    const validPass = bcrypt.compareSync(req.body.password, user.password);
    if (!validPass){
      throw Error;
    }
    const token = jwt.sign({username:user.username}, "PSKEY");
    res.status(200).send(token);

  }

  catch(error){
    res.status(400).send("Login Failed");
  }

});






router.post('/add', async function(req, res, next) {

  const { username, password, email, type} = req.body;
  const user = new User({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10),
    type: type,
  });
  try{
    await user.save();
    res.status(201).send("User Added");
  }
  catch (error){
    res.status(500).send({error: `${error.code}: Error adding user`});
  }

});


router.get('/get/:id', async function(req, res, next) {
  var id = req.params.id;
  var user = await User.findById(id).select({
    username: 1,
    type: 1,
    ownedGames: 1,
    email: 1,
  }).populate("ownedGames");

  res.send(user);
});

router.post('/addgame', async function(req, res, next) {
  var userId = req.body.userId;
  var gameId = req.body.gameId;
  var chosenUser = await User.findById(userId);
  chosenUser.ownedGames.push(gameId);
  try{
    await chosenUser.save();
    res.status(201).send("Game Added To Library");
  }
  catch (error){
    res.status(500).send({error: `${error.code}: Error adding game to library`});
  }

});

router.post('/removeGame', async function(req, res, next) {
  var userId = req.body.userId;
  var gameId = req.body.gameId;
  var chosenUser = await User.findById(userId);
  chosenUser.ownedGames = chosenUser.ownedGames.filter(game=>game.toString() !== gameId);
  try{
    await chosenUser.save();
    res.status(201).send("Game Removed From Library");
  }
  catch (error){
    res.status(500).send({error: `${error.code}: Error removing game from library`});
  }

});

router.get('/remove', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
