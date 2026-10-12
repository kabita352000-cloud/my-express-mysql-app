const pool = require("../../../config/db");

const Category = {
  // Get all users
  getAllCategorys: async () => {
    const [rows] = await pool.query("SELECT id, name, description,status,isDelete, created_at updated_at FROM categories");
    return rows;
  },
    // Create user
  createCategory: async (name,description ) => {
    console.log("📌 Query params:", name, description); // debug
    const [result] = await pool.query(
      "INSERT INTO categories (name, description) VALUES (?, ?)",
      [name, description]  // 👈 match the placeholders
    );
    // return result
    return {
      id: result.insertId,   // MySQL gives the auto_increment id
      name,
      description
    };
  },
}


module.exports = Category;
