import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
const app = express();

//clerk-webhook
import webhookRoute from "./routes/clerkWebhook-route.js";
app.use("/api/webhooks", webhookRoute);

app.use(cors({
    origin: [ "http://localhost:5173", "https://grunt-canine-running.ngrok-free.dev"],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(clerkMiddleware())

app.get("/healthcheck", (req, res)=>{
    res.json({ msg: "HealthCheck successful!"})
})

//routes
import userRoute from "./routes/user-route.js";
app.use("/api/v1/users", userRoute);

export default app;