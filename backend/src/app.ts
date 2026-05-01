import express from "express";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(clerkMiddleware())

app.get("/healthcheck", (req, res)=>{
    res.json({ msg: "HealthCheck successful!"})
})


export default app;