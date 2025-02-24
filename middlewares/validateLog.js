var {validateLog} = require("../models/user");

function valLogin(req, res, next){
    let {error} = validateLog(req.body);

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
}

module.exports  = valLogin;