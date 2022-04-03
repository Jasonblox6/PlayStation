var jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (header){
        const token = header.split(" ")[1];
        jwt.verify(token, "PSKEY", function(err, user){
            if (err){
                return res.sendStatus(403)
            }
            else{
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
