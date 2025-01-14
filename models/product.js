var mongoose = require("mongoose");
var Joi = require("joi");

var productSchema = mongoose.Schema({
    name: String,
    price: Number
});

var productModel = mongoose.model("Product", productSchema);

var validate = function(data){
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(data, {abortEarly: false});
}

module.exports.productModel = productModel;
module.exports.validateProd = validate;