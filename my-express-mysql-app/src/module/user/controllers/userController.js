const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json({
      data: {
        statusCode: 200,
        status: 'Success',
        message: "Users Featch successfully",

        users
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("req.body====", req.body);

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const user = await User.createUser(name, email, hashedPassword);

    // Send response in consistent format
    res.json({
      data: {
        message: "User created successfully",
        user
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// -------------------- LOGIN --------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },  // payload
      process.env.JWT_SECRET,              // secret
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.json({
      data: {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token, // send token back
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { getUsers, addUser, loginUser };
