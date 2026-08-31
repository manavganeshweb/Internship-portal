import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "Remote",
      trim: true,
    },

    type: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "remote",
    },

    duration: {
      type: String,
      required: true,
    },

    stipend: {
      type: String,
      default: "Unpaid",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    eligibility: {
      type: String,
      default: "",
      trim: true,
    },

    openings: {
      type: Number,
      default: 1,
      min: 1,
    },

    startDate: {
      type: Date,
      default: null,
    },

    applicationDeadline: {
      type: Date,
      default: null,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model(
  "Internship",
  internshipSchema
);

export default Internship;