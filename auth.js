const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");

// Register
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      customerId: req.body.customerId,
      role: req.body.role,
    });

    const user = await newUser.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "🎉 Welcome to Flowbit",
      text: `Hi ${req.body.email}, welcome aboard!`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log("❌ Email failed:", err);
      else console.log("✅ Email sent:", info.response);
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Invalid credentials");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).json("Invalid credentials");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Protected route for Admin
router.get("/admin-data", verifyToken, verifyRole(["Admin"]), (req, res) => {
  res.json({ message: "Hello Admin 👑" });
});

// Protected route for Customer
router.get("/customer-data", verifyToken, verifyRole(["Customer"]), (req, res) => {
  res.json({ message: "Welcome, valued customer! 💎" });
});

module.exports = router;
