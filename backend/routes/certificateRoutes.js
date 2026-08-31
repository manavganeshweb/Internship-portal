import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getMyCertificates,
  getCertificateById,
  createCertificate,
  deleteCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();

// Student routes

router.get(
  "/my",
  authMiddleware,
  getMyCertificates
);

router.get(
  "/:id",
  authMiddleware,
  getCertificateById
);

// Admin routes

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCertificate
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCertificate
);

export default router;