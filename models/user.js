const mongoose  = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
});
// code for hashing passwords
// we can define custom methods related to model( fatty models ) in this way
userSchema.methods.generateHashedPassword = async function(){
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
};


var userModel = mongoose.model('User', userSchema);


var validateUserReg = function(data){
    const schema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).max(20).required(),
        role: Joi.string().valid('user', 'admin')
    });
    return schema.validate(data, {abortEarly: false});
}

var validateLog = function(data){
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data, {abortEarly: false});
}

module.exports.user = userModel;
module.exports.validateUserReg = validateUserReg;
module.exports.validateLog = validateLog;



