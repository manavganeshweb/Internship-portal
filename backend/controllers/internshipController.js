import Internship from "../models/Internship.js";
import mongoose from "mongoose";
export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({
      isPublished: true,
      status: "published",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: internships.length,
      internships,
    });
  } catch (error) {
    console.error("Get internships error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
    });
  }
};

export const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID",
      });
    }

    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    return res.status(200).json({
      success: true,
      internship,
    });
  } catch (error) {
    console.error("Get internship error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch internship",
    });
  }
};
export const createInternship = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      location,
      type,
      duration,
      stipend,
      skills,
      eligibility,
      openings,
      startDate,
      applicationDeadline,
      isPublished,
      status,
    } = req.body;

    if (!title || !company || !description || !duration) {
      return res.status(400).json({
        success: false,
        message:
          "Title, company, description and duration are required",
      });
    }

    const internship = await Internship.create({
      title,
      company,
      description,
      location,
      type,
      duration,
      stipend,
      skills,
      eligibility,
      openings,
      startDate,
      applicationDeadline,
      isPublished,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Internship created successfully",
      internship,
    });
  } catch (error) {
    console.error("Create internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create internship",
    });
  }
};

export const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship updated successfully",
      internship,
    });
  } catch (error) {
    console.error("Update internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update internship",
    });
  }
};

export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(
      req.params.id
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
    });
  } catch (error) {
    console.error("Delete internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete internship",
    });
  }
};
export const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: internships.length,
      internships,
    });
  } catch (error) {
    console.error("Get all internships error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
    });
  }
};

export const getAdminInternshipById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID",
      });
    }

    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    return res.status(200).json({
      success: true,
      internship,
    });
  } catch (error) {
    console.error("Get admin internship error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch internship",
    });
  }
};