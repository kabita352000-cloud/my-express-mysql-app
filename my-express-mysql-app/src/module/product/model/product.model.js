const pool = require("../../../config/db");

const Product = {
    // Get all Product
    // getAllProducts: async () => {
    //     const [rows] = await pool.query("SELECT id, name,price,description,category_id,status,isDelete,updated_at, created_at FROM products");
    //     return rows;
    // },
    getAllFaq1: async (page = 1, limit = 10) => {
        const offset = (page - 1) * limit;

        // Fetch only active, not-deleted products
        const [rows] = await pool.query(
            `SELECT id, name,price,description,category_id, status, isDelete, created_at, updated_at FROM products
     WHERE isDelete = 0 AND status = 'active' LIMIT ? OFFSET ?`, [parseInt(limit), parseInt(offset)]);

        // Get total count of active products
        const [[{ total }]] = await pool.query(
            `SELECT COUNT(*) AS total FROM products WHERE isDelete = 0 AND status = 'active'`);

        return {
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
            data: rows,
        };
    },

    getAllProducts: async (page = 1, limit = 10) => {
        const offset = (page - 1) * limit;

        // JOIN with categories to get category name
        const [rows] = await pool.query(
            `SELECT p.id, p.name, p.price, p.description, p.category_id, c.name AS category_name,
            p.status, p.isDelete, p.created_at, p.updated_at
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.isDelete = 0 AND p.status = 'active'
     LIMIT ? OFFSET ?`,
            [parseInt(limit), parseInt(offset)]
        );

        const [[{ total }]] = await pool.query(
            `SELECT COUNT(*) AS total FROM products WHERE isDelete = 0 AND status = 'active'`
        );

        // Transform each product to include category object
        const dataWithCategory = rows.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            status: product.status,
            isDelete: product.isDelete,
            created_at: product.created_at,
            updated_at: product.updated_at,
            category: product.category_id
                ? { id: product.category_id, name: product.category_name }
                : null,
        }));

        return {
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
            data: dataWithCategory,
        };
    },


    // Create Product
    createProduct: async (name, price, description, category_id) => {
        console.log("📌 Query params:", name, price, description, category_id); // debug
        const [result] = await pool.query(
            "INSERT INTO products (name,price,description,category_id) VALUES (?, ?, ?,?)",
            [name, price, description, category_id]  // 👈 match the placeholders
        );
        // return result
        return {
            id: result.insertId,   // MySQL gives the auto_increment id
            name, price, description, category_id
        };
    },
    // update
    updateData: async ({ id, name, price, description, category_id }) => {
        // Safely parse numeric fields
        console.log('category_id----', id, price, category_id);

        const parsedId = Number(id);
        const parsedPrice = Number(price);
        const parsedCategory = Number(category_id);
        console.log('parsedId........', parsedPrice, parsedCategory);

        if (isNaN(parsedId) || isNaN(parsedPrice) || isNaN(parsedCategory)) {
            throw new Error("Invalid input: id, price, and category_id must be numbers");
        }

        // 1. Update product
        const [result] = await pool.query(
            `UPDATE products 
     SET name = ?, price = ?, description = ?, category_id = ?, updated_at = NOW()
     WHERE id = ? AND isDelete = 0`,
            [name, parsedPrice, description, parsedCategory, parsedId]
        );

        if (result.affectedRows === 0) {
            throw new Error("Product not found or nothing updated");
        }

        // 2. Fetch updated product with category
        const [rows] = await pool.query(
            `SELECT p.id, p.name, p.price, p.description, p.status, p.isDelete, 
            p.created_at, p.updated_at, 
            c.id AS category_id, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
            [parsedId]
        );

        const product = rows[0];

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            status: product.status,
            isDelete: product.isDelete,
            created_at: product.created_at,
            updated_at: product.updated_at,
            category: product.category_id
                ? { id: product.category_id, name: product.category_name }
                : null,
        };
    }

    ,



    // delete
    deleteData: async (id) => {

        const [result] = await pool.query(
            "UPDATE products SET isDelete = 1 WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Products not found or already deleted");
        }

        return { id, message: "Products deleted successfully" };
    },

    getProductById: async (id) => {
        const [rows] = await pool.query(
            `SELECT p.id, p.name, p.price, p.description, p.category_id, c.name AS category_name,
            p.status, p.isDelete, p.created_at, p.updated_at
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = ? AND p.isDelete = 0 AND p.status = 'active'`,
            [id]
        );

        if (rows.length === 0) {
            throw new Error("Product not found");
        }

        const product = rows[0];

        // Transform: embed category object
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            status: product.status,
            isDelete: product.isDelete,
            created_at: product.created_at,
            updated_at: product.updated_at,
            category: product.category_id
                ? { id: product.category_id, name: product.category_name }
                : null,
        };
    }




};

module.exports = Product;
