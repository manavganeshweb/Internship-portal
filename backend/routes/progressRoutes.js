import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  markLessonComplete,
  markLessonIncomplete,
  getEnrollmentProgress,
} from "../controllers/progressController.js";

const router = express.Router();

router.patch(
  "/:enrollmentId/lessons/:lessonId/complete",
  authMiddleware,
  markLessonComplete
);

router.patch(
  "/:enrollmentId/lessons/:lessonId/incomplete",
  authMiddleware,
  markLessonIncomplete
);

router.get(
  "/:enrollmentId",
  authMiddleware,
  getEnrollmentProgress
);

export default router;