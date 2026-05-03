import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { prisma } from "../db/prisma.js";
import type { Request, Response } from "express";

interface loggedIn extends Request {
    userId?: string
}

const loggedInUser = asyncHandler(async(req: loggedIn, res: Response) => {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: req.userId,
      },
    });

    if(!user){
        throw new ApiError(401, "No user exists")
    }

    return res.status(200).json(new ApiResponse(200, user, "User fetched successfully!"))
});

export { loggedInUser }