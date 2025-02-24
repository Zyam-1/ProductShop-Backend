const express = require("express");
const router = express.Router();
const {productModel} = require("../../models/product");
const validate = require("../../middlewares/validateProd");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");


router.get("/", async (req, res)=>{
    let page = parseInt(req.query.page ? req.query.page : 1);
    let perPage = parseInt(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = (page - 1) * perPage;
    console.log(req.query);
    let products = await productModel.find().skip(skipRecords).limit(perPage);
    return res.send(products);
});


router.delete("/:id", auth, admin, async(req, res)=>{
    var id = req.params.id;
    if(id){
        let deletedProduct = await productModel.findByIdAndDelete(id);
        return res.send(deletedProduct);
    }
});

router.post("/", auth,  validate, async (req, res)=>{
    let newProd = new productModel;
    newProd.name = req.body.name;
    newProd.price = req.body.price;
    newProd.save();
    return res.send(newProd);

});


router.put("/:id", validate, async(req, res,)=>{
    try {
        let id = req.params.id;
        let updateProd = await productModel.findById(id);
        if(updateProd){
            updateProd.name = req.body.name;
            updateProd.price = req.body.price;
            updateProd.save();
            return res.send(updateProd);
        }
        return res.status(400).send("No product is present with the given ID");
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.get("/:id", async (req, res)=>{
    try {
        let id = req.params.id;
        let product = await productModel.findById(id);
        if(!product) return res.status(400).send("Product with given id not found");
        return res.send(product);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

module.exports = router;