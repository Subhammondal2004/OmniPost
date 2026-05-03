import express from "express";
import { loggedInUser } from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.route("/").get(authMiddleware, loggedInUser);

export default router;