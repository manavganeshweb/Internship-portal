import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Student from "../models/Student.js";

export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      college,
      course,
      skills,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingStudent = await Student.findOne({
      email: email.toLowerCase(),
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "A student with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = await Student.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      college,
      course,
      skills,
    });

    const token = jwt.sign(
      {
        id: student._id,
        role: student.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
      },
    });
  } catch (error) {
    console.error("Register student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to register student",
    });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const student = await Student.findOne({
      email: email.toLowerCase(),
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!student.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      student.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        role: student.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
      },
    });
  } catch (error) {
    console.error("Login student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};