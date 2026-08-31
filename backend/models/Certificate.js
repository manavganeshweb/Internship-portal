import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },

    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    certificateId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    issuedDate: {
      type: Date,
      default: Date.now,
    },

    certificateUrl: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["course", "internship"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

certificateSchema.index({ student: 1 });

const Certificate = mongoose.model(
  "Certificate",
  certificateSchema
);

export default Certificate;