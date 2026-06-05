import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


import authRoutes from "./routes/authRoutes";
import documentRoutes from "./routes/documentRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env");
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.delete("/api/reset-docs", async (_req, res) => {
  const Document = (await import("./models/DocumentModel")).default;

  await Document.deleteMany({});

  res.json({ message: "All docs deleted" });
});
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });