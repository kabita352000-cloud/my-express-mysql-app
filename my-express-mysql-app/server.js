const express = require("express");
require("dotenv").config();
// const userRoutes = require("./src/module/user/routes/userRoutes");
const routes = require("./routes");
// app.use("/api", routes);  // 👈 all routes will start with /api

const db = require("./src/config/db"); // your db.js file

const app = express();

app.use(express.json());


// test DB connection
db.query("SELECT 1")
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

// Routes
app.use("/api/", routes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

