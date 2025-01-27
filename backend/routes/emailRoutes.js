import express from "express";
import { sendJobAlerts } from "../controllers/emailController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send-job-alerts", isAuthenticated, sendJobAlerts);

export default router;