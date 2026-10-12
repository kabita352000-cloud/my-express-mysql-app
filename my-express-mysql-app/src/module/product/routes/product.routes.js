const express = require("express");
const { getProducts, addProduct, geDetailsById, updateData, deleteData } = require("../controller/product.controller");

const router = express.Router();

router.get("/all", getProducts);
router.post("/add", addProduct); 
router.get("/get-details/:id", geDetailsById)
router.put("/update", updateData)
router.delete("/delete/:id", deleteData)


module.exports = router;
