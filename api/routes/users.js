var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const User = require("../models/User");
var bcrypt = require("bcryptjs");

//User Login Method - Takes a username and uses bcrypt to check if the hashed password for that user matches the entered one.
router.post('/login', async function(req, res, next) {
  try{
    const user = await User.findOne({username:req.body.username})
    const validPass = bcrypt.compareSync(req.body.password, user.password);
    if (!validPass){
      throw Error;
    }

    //On login, we use jwt and our key to generate a token
    const token = jwt.sign({username:user.username}, "PSKEY");
    //We pass back a model with the userId and the token - userId is used for library parsing.
    const loginModel = {userId: user.id, token: token};

    res.status(200).send(loginModel);

  }

  //We return an error if the login fails.
  catch(error){
    res.status(400).send("Login Failed");
  }

});

//Add User Method - Used when signing up
router.post('/add', async function(req, res, next) {

  //Takes the fields from the sign up, but also a default type of 0 (User)
  //Uses bcrypt to hash the password using a salt of 10.
  const { username, password, email, type} = req.body;
  const user = new User({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10),
    type: type,
  });

  //Attempt to save the user and return an error if there's some issue.
  try{
    await user.save();
    res.status(201).send("User Added");
  }
  catch (error){
    res.status(500).send("Error adding user");
  }

});


//Get User Method - Takes An Id And Returns The User
router.get('/get/:id', async function(req, res, next) {
  var id = req.params.id;

  //Use .populate to automatically generate the game objects array based on the game ids.
  var user = await User.findById(id).select({
    username: 1,
    type: 1,
    ownedGames: 1,
    email: 1,
  }).populate("ownedGames");

  console.log(user);
  res.send(user);
});

//Add Game Method - Adds A Chosen Game To The User's Library
router.post('/addgame', async function(req, res, next) {
  var userId = req.body.userId;
  var gameId = req.body.gameId;
  //Checks the user.
  var chosenUser = await User.findById(userId);
  //Adds the game to the library.
  chosenUser.ownedGames.push(gameId);
  try{
    await chosenUser.save();
    res.status(201).send("Game Added To Library");
  }
  catch (error){
    res.status(500).send({error: `${error.code}: Error adding game to library`});
  }

});

//Remove Game Method - Removes A Chosen Game From The User's Library
router.post('/removeGame', async function(req, res, next) {
  var userId = req.body.userId;
  var gameId = req.body.gameId;
  var chosenUser = await User.findById(userId);
  //Filter their owned games to only be those that aren't the chosen game.
  chosenUser.ownedGames = chosenUser.ownedGames.filter(game=>game.toString() !== gameId);
  try{
    //Overwrite
    await chosenUser.save();
    res.status(201).send("Game Removed From Library");
  }
  catch (error){
    res.status(500).send({error: `${error.code}: Error removing game from library`});
  }

});

//Owns Game Method - Checks If A User Owns A Game
router.post('/owns/:id', async function(req, res, next) {
  var id = req.params.id;
  var userId = req.body.userId;
  var chosenUser = await User.findById(userId);
  //Filters for the chosen game.
  var foundGame = chosenUser.ownedGames.filter(game=>game.toString() === id);
  //If that "list" isn't empty, the user must own it.
  if (foundGame.length > 0){
    return res.send("owned");
  }
  res.send("unowned");

});

module.exports = router;
