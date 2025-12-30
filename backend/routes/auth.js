const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// TEMP in-memory users (SAFE MODE)
// Later we will move to MongoDB
const users = [];

/**
 * SIGN UP
 */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  users.push({
    name,
    email,
    password: hashed,
  });

  res.json({ message: "Signup successful" });
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { email: user.email },
    "secret123",
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token,
    user: { name: user.name, email: user.email },
  });
});

module.exports = router;
