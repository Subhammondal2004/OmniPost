import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";


export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = getAuth(req);
      if (!auth.userId) {
        throw new ApiError(401, "Unauthorized request!");
      }
      //@ts-ignore
      req.userId = auth.userId;
      next();
    } catch (error) {
      throw new ApiError(401, "Authorization failed!!");
    }
  },
);
