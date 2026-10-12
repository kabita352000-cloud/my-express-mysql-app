const Product = require("../model/product.model");
const getProducts = async (req, res) => {
    try {
        const product = await Product.getAllProducts();
        res.json({
            data: {
                statusCode: 200,
                status: 'Success',
                message: "Users Featch successfully",
                product
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, price, description, category_id } = req.body;
        const product = await Product.createProduct(name, price, description, category_id);

        // Send response in consistent format
        res.json({
            data: {
                message: "Product created successfully",
                product
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateData = async (req, res) => {
  try {
    const updatedProduct = await Product.updateData(req.body);

    res.json({
      data: {
        statusCode: 200,
        status: "Success",
        message: "Product updated successfully",
        product: updatedProduct
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteData = async (req, res) => {
    try {
       const { id } = req.params; 

        const result = await Product.deleteData(id);

        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: result.message,
                product: { id }
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const geDetailsById = async (req, res) => {
    try {
        const { id } = req.params;  // read ID from URL parameter
        const product = await Product.getProductById(id);

        res.json({
            data: {
                statusCode: 200,
                status: "Success",
                message: "Product fetched successfully",
                product
            }
        });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};


module.exports = { getProducts, addProduct, geDetailsById, updateData, deleteData };
