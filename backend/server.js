import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/certificates", certificateRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Nexavision Portal API is running",
  });
});
app.use("/api/courses", courseRoutes);
app.use("/api/student", studentRoutes);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});