const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
const Category = require("../model/category.model")

const getCategorys = async (req, res) => {
    try {
        const categories = await Category.getAllCategorys();
        res.json({
            data: {
                statusCode: 200,
                status: 'Success',
                message: "Category Featch successfully",

                categories
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const categories = await Category.createCategory(name, description);
        res.json({
            data: {
                statusCode: 200,
                status: 'Success',
                message: "Category created successfully",
                categories
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





module.exports = { getCategorys, addCategory };
