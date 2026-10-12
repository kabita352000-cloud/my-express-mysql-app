const pool = require("../../../config/db");

const User = {
  // Get all users
  getAllUsers: async () => {
    const [rows] = await pool.query("SELECT id, name, email, created_at FROM users");
    return rows;
  },

  // Create user
  createUser: async (name, email, password) => {
    console.log("📌 Query params:", name, email, password); // debug
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]  // 👈 match the placeholders
    );
    // return result
    return {
      id: result.insertId,   // MySQL gives the auto_increment id
      name,
      email,
      password
    };
  },

  findByEmail: async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0]; // return single user
}

};

module.exports = User;
