const express = require("express");
const router = express.Router();

// import your module routes
const roleRoutes = require("../my-express-mysql-app/src/module/role/routes/role.routes");

const userRoutes = require("../my-express-mysql-app/src/module/user/routes/userRoutes");
const categoryRoutes = require("../my-express-mysql-app/src/module/category/routes/category.routes");
const productRoutes = require("../my-express-mysql-app/src/module/product/routes/product.routes");
const faqRoutes = require("../my-express-mysql-app/src/module/faq/routes/faq.routes");

// mount them with base paths
router.use("/role", roleRoutes);

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/product", productRoutes);
router.use("/faq", faqRoutes);



module.exports = router;
