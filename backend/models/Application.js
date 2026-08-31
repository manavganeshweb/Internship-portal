import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },

    coverLetter: {
      type: String,
      default: "",
      trim: true,
    },

    resume: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "applied",
        "shortlisted",
        "selected",
        "rejected",
      ],
      default: "applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index(
  { student: 1, internship: 1 },
  { unique: true }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;