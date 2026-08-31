import Application from "../models/Application.js";
import Internship from "../models/Internship.js";

export const applyForInternship = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { internshipId, coverLetter, resume } = req.body;

    if (!internshipId) {
      return res.status(400).json({
        success: false,
        message: "Internship ID is required",
      });
    }

    const internship = await Internship.findOne({
      _id: internshipId,
      isPublished: true,
      status: "published",
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found or no longer available",
      });
    }

    if (
      internship.applicationDeadline &&
      new Date() > new Date(internship.applicationDeadline)
    ) {
      return res.status(400).json({
        success: false,
        message: "Application deadline has passed",
      });
    }

    const existingApplication = await Application.findOne({
      student: studentId,
      internship: internshipId,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this internship",
      });
    }

    const application = await Application.create({
      student: studentId,
      internship: internshipId,
      coverLetter,
      resume,
    });

    const populatedApplication = await Application.findById(
      application._id
    )
      .populate("student", "name email phone college course")
      .populate(
        "internship",
        "title company location type duration stipend"
      );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: populatedApplication,
    });
  } catch (error) {
    console.error("Apply internship error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const studentId = req.user.id;

    const applications = await Application.find({
      student: studentId,
    })
      .populate(
        "internship",
        "title company location type duration stipend"
      )
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get my applications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate(
        "student",
        "name email phone college course skills"
      )
      .populate(
        "internship",
        "title company location type duration stipend"
      )
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get all applications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(
      req.params.id
    )
      .populate(
        "student",
        "name email phone college course skills"
      )
      .populate(
        "internship",
        "title company location type duration stipend"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Get application error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "applied",
      "shortlisted",
      "selected",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    application.reviewedAt = new Date();

    await application.save();

    const updatedApplication =
      await Application.findById(application._id)
        .populate(
          "student",
          "name email phone college course"
        )
        .populate(
          "internship",
          "title company location type duration stipend"
        );

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};
export const getMyApplicationById = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;

    const application = await Application.findOne({
      _id: id,
      student: studentId,
    })
      .populate(
        "student",
        "name email phone college course skills"
      )
      .populate(
        "internship",
        "title company description location type duration stipend"
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(
      "Get my application by ID error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};