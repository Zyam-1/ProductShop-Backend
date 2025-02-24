const {validateUserReg} = require("../models/user");


function valReg(req, res, next){
    let {error} = validateUserReg(req.body);
    if(error){
        let errorArray = [];
        let errors = error.details;
        let i = 0;
        for(const error of errors){
            errorArray[i] = error.message;
            i++;
        }
        return res.status(400).send(errorArray);
    }
    next();
};

module.exports  = valReg;