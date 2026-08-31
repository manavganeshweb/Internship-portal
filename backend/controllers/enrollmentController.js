import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollInCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (!course.isPublished) {
      return res.status(400).json({
        success: false,
        message: "This course is not available for enrollment",
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    const populatedEnrollment = await Enrollment.findById(
      enrollment._id
    )
      .populate("course", "title description duration level instructor")
      .populate("student", "name email");

    res.status(201).json({
      success: true,
      message: "Enrolled in course successfully",
      enrollment: populatedEnrollment,
    });
  } catch (error) {
    console.error("Enroll course error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to enroll in course",
    });
  }
};

export const getMyEnrollments = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({
      student: studentId,
    })
      .populate(
        "course",
        "title description duration level instructor thumbnail"
      )
      .sort({ enrolledAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    console.error("Get enrollments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollments",
    });
  }
};

export const getEnrollmentByCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    })
      .populate(
        "course",
        "title description duration level instructor thumbnail modules"
      )
      .populate("student", "name email");

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    res.status(200).json({
      success: true,
      enrollment,
    });
  } catch (error) {
    console.error("Get enrollment by course error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollment",
    });
  }
};