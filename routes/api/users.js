const express = require('express');
const router = express.Router();
const valReg = require("./../../middlewares/validateReg");
const {user} = require("./../../models/user");
const valLogin = require("../../middlewares/validateLog");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs")

router.post("/register", valReg, async (req, res)=>{
    let newUser  = await user.findOne({email: req.body.email});
    if (newUser){
        return res.status(400).send("Email already registered");
    }
    newUser = new user;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    await newUser.generateHashedPassword();
    await newUser.save();
    return res.send(newUser);
});

router.post("/login",valLogin, async (req, res)=>{
    let checkUser = await user.findOne({email: req.body.email});
    if(!checkUser) return res.status(400).send("User with this email doesn't exist");
    console.log(checkUser.password);
    let isValid = await bcrypt.compare(req.body.password, checkUser.password);
    if(!isValid) return res.status(401).send("Incorrect Password");
    var token = jwt.sign({ id: checkUser._id, name: checkUser.name, role: checkUser.role}, config.get("jwtKey"));
    return res.send(token);

})

module.exports = router;