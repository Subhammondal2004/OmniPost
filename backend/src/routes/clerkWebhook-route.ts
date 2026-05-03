import express from "express";
import { clerkWebhook } from "../controllers/clerkWebhook-controller.js";

const router = express.Router();

router.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook
);

export default router;