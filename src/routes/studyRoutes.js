import express from "express";
import { handleStudyRequest } from "../controllers/studyController.js";

const router = express.Router();

router.post("/", handleStudyRequest);

export default router;
