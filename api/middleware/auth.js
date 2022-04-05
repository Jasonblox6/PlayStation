//Authentication Service
var jwt = require('jsonwebtoken');

//Authenticate method
const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (header){
        //Get the token part of the header by splitting on the space
        const token = header.split(" ")[1];
        //Veryify using our key
        jwt.verify(token, "PSKEY", function(err, user){
            if (err){
                return res.sendStatus(403)
            }
            else{
                //We've returned a user, so pass that to the request
                req.user = user;
                next();
            }
        })
    }
    else{
        res.sendStatus(401);
    }
}

const authJWT = {
    verify: authenticate,
}

module.exports = authJWT;
