import express from "express";
import {
  applyForInternship,
  getMyApplications,
  getMyApplicationById,
} from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post(
  "/",
  authMiddleware,
  applyForInternship
);

router.get(
  "/my",
  authMiddleware,
  getMyApplications
);
router.get(
  "/my/:id",
  authMiddleware,
  getMyApplicationById
);

export default router;