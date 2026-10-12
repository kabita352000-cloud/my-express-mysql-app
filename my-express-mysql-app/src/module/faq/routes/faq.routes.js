const express = require("express");
const { getFaqs, addFaq, updateFaq, deleteFaq, getFaqById } = require("../controller/faq.controller");
const router = express.Router();
router.post("/all", getFaqs);
router.post("/add", addFaq);
router.put("/update", updateFaq);
router.delete("/delete", deleteFaq);
router.get("/get-details/:id", getFaqById);




module.exports = router;
