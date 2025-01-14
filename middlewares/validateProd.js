var {validateProd} = require("../models/product");

function validate(req, res, next){
    let {error} = validateProd(req.body);
    if(error) {
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


module.exports = validate;