const express = require('express');
const router = express.Router();
const valReg = require("./../../middlewares/validateReg");
const {user} = require("./../../models/user"); 

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

router.post("/login", )

module.exports = router;