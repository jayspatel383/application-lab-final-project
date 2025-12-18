import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// ============ REGISTER ROUTE ============
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user (THIS is the important part)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: userResponse
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


// ============ LOGIN ROUTE ============
router.post("/login", async (req, res) => {
  console.log("🔑 LOGIN ROUTE HIT");
  
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "SECRET123",
      { expiresIn: "7d" }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    // Send success response
    res.json({
      success: true,
      message: "Login successful",
      token: token,
      user: userResponse
    });
    
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
});

export default router;