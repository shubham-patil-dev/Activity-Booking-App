import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../utils/validators.js";

// Register
export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        details: error.details.map((d) => d.message.replace(/['"]+/g, "")),
      });
    }

    const { email } = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        details: error.details.map((d) => d.message.replace(/['"]+/g, "")),
      });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
