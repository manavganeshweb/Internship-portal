import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    completedLessons: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "completed", "dropped"],
      default: "active",
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

enrollmentSchema.index(
  { student: 1, course: 1 },
  { unique: true }
);

const Enrollment = mongoose.model(
  "Enrollment",
  enrollmentSchema
);

export default Enrollment;