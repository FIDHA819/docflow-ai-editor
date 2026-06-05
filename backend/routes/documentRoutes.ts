import express from "express";

import {
  createDocument,
  deleteDocument,
  getDocument,
  getDocuments,
  shareDocument,
  updateDocument,
} from "../controllers/documentController";

import { protect } from "../middlewares/JWTMiddleware";

const router = express.Router();

router.use(protect);

router.post("/", createDocument);

router.get("/", getDocuments);

router.get("/:id", getDocument);

router.put("/:id", updateDocument);

router.delete("/:id", deleteDocument);

router.post(
  "/:id/share",
  shareDocument
);

export default router;