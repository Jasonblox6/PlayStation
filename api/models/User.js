const mongoose = require('mongoose');

//User Model
const UserSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: Number, default: 0 },
    ownedGames: [{ type: mongoose.Types.ObjectId, ref: "Game"}],   
});

module.exports = mongoose.model("User", UserSchema);

