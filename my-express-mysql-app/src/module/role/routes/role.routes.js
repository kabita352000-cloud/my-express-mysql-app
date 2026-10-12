const express = require("express");
const { getRole, addRole, update, deleteRole, getRoleById } = require("../controller/role.controller");
const router = express.Router();
router.get("/all", getRole);
router.post("/add", addRole);
router.put("/update", update);
router.delete("/delete/:id", deleteRole);
router.get("/get-details/:id", getRoleById);




module.exports = router;
