import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { Request,Response,NextFunction } from "express";
import { getAuth } from "@clerk/express";

export const authMiddleware = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const auth = getAuth(req);
    } catch (error) {
        
    }
})

//Need to complete the auth using clerk