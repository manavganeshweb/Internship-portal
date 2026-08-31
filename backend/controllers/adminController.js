import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Student from "../models/Student.js";
import Application from "../models/Application.js";
import Admin from "../models/Admin.js";

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create admin",
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to login admin",
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("Get all students error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Get student by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch student",
    });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate(
        "student",
        "name email phone profileImage college course"
      )
      .populate("internship", "title company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Get applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};