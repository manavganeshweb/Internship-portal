import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getInternships,
  getInternshipById,
  getAllInternships,
  getAdminInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
} from "../controllers/internshipController.js";

const router = express.Router();




router.get("/", getInternships);
router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllInternships
);

router.get(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  getAdminInternshipById
);

// Public single internship
router.get("/:id", getInternshipById);



router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createInternship
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateInternship
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteInternship
);

export default router;