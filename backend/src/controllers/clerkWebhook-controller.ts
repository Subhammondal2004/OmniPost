import type { Request, Response } from "express";
import { Webhook } from "svix";
import { prisma } from "../db/prisma.js";

export const clerkWebhook = async (req: Request,res: Response) => {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string;
    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);

    const evt = wh.verify(
        payload.toString(),
      {
        "svix-id":
          headers["svix-id"] as string,
        "svix-timestamp":
          headers[
            "svix-timestamp"
          ] as string,
        "svix-signature":
          headers[
            "svix-signature"
          ] as string,
      }
    ) as any;


    if (evt.type === "user.created") {
      const user = evt.data;

      await prisma.user.create({
        data: {
          clerkId: user.id,
          email:user.email_addresses[0]?.email_address,
          username: user.first_name+" "+user.last_name,
          avater: user.image_url,
        },
      });
    }

    if(evt.type === "user.deleted"){
        const user = evt.data;
        await prisma.user.delete({
            where:{
                clerkId: user.id
            }
        })
    }

    return res.status(200).json({   success: true });

  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Webhook error" });
  }
};