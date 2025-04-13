const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

// Function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

// 🔐 Register Controller
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("📥 Register Request Body:", req.body);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = createToken(user._id);

    // Respond with token and user details
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// 🔐 Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Login Request Body:", req.body);

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = createToken(user._id);

    // Respond with token and user details
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
};
