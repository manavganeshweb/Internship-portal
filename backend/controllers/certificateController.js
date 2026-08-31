import mongoose from "mongoose";
import Certificate from "../models/Certificate.js";

export const getMyCertificates = async (req, res) => {
  try {
    const studentId = req.user.id;

    const certificates = await Certificate.find({
      student: studentId,
    })
      .populate("course", "title description")
      .populate(
        "internship",
        "title company location type duration"
      )
      .sort({ issuedDate: -1 });

    return res.status(200).json({
      success: true,
      count: certificates.length,
      certificates,
    });
  } catch (error) {
    console.error("Get my certificates error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificates",
    });
  }
};

export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    const certificate = await Certificate.findById(id)
      .populate(
        "student",
        "name email phone college course"
      )
      .populate("course", "title description")
      .populate(
        "internship",
        "title company location type duration stipend"
      );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    // Students can only access their own certificates.
    if (
      req.user.role !== "admin" &&
      certificate.student._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this certificate",
      });
    }

    return res.status(200).json({
      success: true,
      certificate,
    });
  } catch (error) {
    console.error("Get certificate error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificate",
    });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const {
      student,
      course,
      internship,
      title,
      certificateId,
      description,
      issuedDate,
      certificateUrl,
      type,
    } = req.body;

    if (!student || !title || !certificateId || !type) {
      return res.status(400).json({
        success: false,
        message:
          "Student, title, certificate ID and type are required",
      });
    }

    if (!["course", "internship"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate type",
      });
    }

    const existingCertificate =
      await Certificate.findOne({
        certificateId,
      });

    if (existingCertificate) {
      return res.status(409).json({
        success: false,
        message: "Certificate ID already exists",
      });
    }

    const certificate = await Certificate.create({
      student,
      course: course || null,
      internship: internship || null,
      title,
      certificateId,
      description,
      issuedDate: issuedDate || new Date(),
      certificateUrl,
      type,
    });

    const populatedCertificate =
      await Certificate.findById(certificate._id)
        .populate(
          "student",
          "name email phone college course"
        )
        .populate("course", "title description")
        .populate(
          "internship",
          "title company location type duration stipend"
        );

    return res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      certificate: populatedCertificate,
    });
  } catch (error) {
    console.error("Create certificate error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create certificate",
    });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    const certificate =
      await Certificate.findByIdAndDelete(id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    console.error("Delete certificate error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete certificate",
    });
  }
};