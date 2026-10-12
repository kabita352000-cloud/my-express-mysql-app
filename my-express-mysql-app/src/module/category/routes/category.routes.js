const express = require("express");
const { getCategorys,addCategory} = require("../controller/category.contrller");

const router = express.Router();

router.get("/all", getCategorys);
// router.post("/all", addUser);

router.post("/add", addCategory); // 👈 new login route

module.exports = router;
