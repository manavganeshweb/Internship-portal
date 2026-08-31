import Student from "../models/Student.js";
import Enrollment from "../models/Enrollment.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await Student.findById(studentId).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const enrollments = await Enrollment.find({
      student: studentId,
    })
      .populate(
        "course",
        "title description duration level instructor thumbnail"
      )
      .sort({ updatedAt: -1 });

    const enrolledCourses = enrollments.length;

    const completedCourses = enrollments.filter(
      (enrollment) => enrollment.status === "completed"
    ).length;

    const inProgressCourses = enrollments.filter(
      (enrollment) =>
        enrollment.status === "active" &&
        enrollment.progress > 0
    ).length;

    const notStartedCourses = enrollments.filter(
      (enrollment) =>
        enrollment.status === "active" &&
        enrollment.progress === 0
    ).length;

    const totalProgress = enrollments.reduce(
      (total, enrollment) => total + (enrollment.progress || 0),
      0
    );

    const averageProgress =
      enrolledCourses === 0
        ? 0
        : Math.round(totalProgress / enrolledCourses);

    return res.status(200).json({
      success: true,

      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        profileImage: student.profileImage,
        college: student.college,
        course: student.course,
        skills: student.skills,
        role: student.role,
      },

      stats: {
        enrolledCourses,
        completedCourses,
        inProgressCourses,
        notStartedCourses,
        averageProgress,
      },

      recentCourses: enrollments,
    });
  } catch (error) {
    console.error("Get student dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch student dashboard",
    });
  }
};