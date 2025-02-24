const jwt  = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next){
    let token = req.header("x-auth-token");
    if(!token) return res.status(400).send("Token not Provided");
    try {
        var user = jwt.verify(token, config.get("jwtKey"));
        req.user = user;
    } catch (error) {
        return res.status(401).send("Incorrect Token")
    }

    next();
}

module.exports = auth;