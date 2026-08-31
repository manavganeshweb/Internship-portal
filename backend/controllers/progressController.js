import Enrollment from "../models/Enrollment.js";


export const markLessonIncomplete = async (req, res) => {
  try {
    const { enrollmentId, lessonId } = req.params;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      student: studentId,
    }).populate("course");

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    const allLessons = enrollment.course.modules.flatMap(
      (module) => module.lessons
    );

    const lessonExists = allLessons.some(
      (lesson) => lesson._id.toString() === lessonId
    );

    if (!lessonExists) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found in this course",
      });
    }

    enrollment.completedLessons =
      enrollment.completedLessons.filter(
        (id) => id.toString() !== lessonId
      );

    const totalLessons = allLessons.length;
    const completedLessons = enrollment.completedLessons.length;

    const progress =
      totalLessons === 0
        ? 0
        : Math.round((completedLessons / totalLessons) * 100);

    enrollment.progress = progress;

      if (progress === 100) {
  enrollment.status = "completed";
  enrollment.completedAt = new Date();
} else if (progress < 100) {
      enrollment.status = "active";
      enrollment.completedAt = null;
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Lesson marked as incomplete",
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
      status: enrollment.status,
    });
  } catch (error) {
    console.error("Mark lesson incomplete error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update lesson progress",
    });
  }
};


export const getEnrollmentProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      student: studentId,
    }).populate("course");

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    const totalLessons = enrollment.course.modules.reduce(
      (total, module) => total + module.lessons.length,
      0
    );

   res.status(200).json({
  success: true,
  progress: enrollment.progress,
  status: enrollment.status,
  totalLessons,
  completedLessons: enrollment.completedLessons,
  completedLessonCount: enrollment.completedLessons.length,
  course: {
    id: enrollment.course._id,
    title: enrollment.course.title,
  },
});
  } catch (error) {
    console.error("Get progress error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch progress",
    });
  }
};

export const markLessonComplete = async (req, res) => {
  try {
    const { enrollmentId, lessonId } = req.params;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      student: studentId,
    }).populate("course");

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    const allLessons = enrollment.course.modules.flatMap(
      (module) => module.lessons
    );

    const lessonExists = allLessons.some(
      (lesson) => lesson._id.toString() === lessonId
    );

    if (!lessonExists) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found in this course",
      });
    }

    const alreadyCompleted = enrollment.completedLessons.some(
      (id) => id.toString() === lessonId
    );

    if (!alreadyCompleted) {
      enrollment.completedLessons.push(lessonId);
    }

    const totalLessons = allLessons.length;
    const completedLessons = enrollment.completedLessons.length;

    const progress =
      totalLessons === 0
        ? 0
        : Math.round((completedLessons / totalLessons) * 100);

    enrollment.progress = progress;

    if (progress === 100) {
      enrollment.status = "completed";
      enrollment.completedAt = new Date();
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Lesson marked as completed",
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
      status: enrollment.status,
    });
  } catch (error) {
    console.error("Mark lesson complete error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update lesson progress",
    });
  }
};