import express from "express";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get("/healthcheck", (req, res)=>{
    res.json({ msg: "HealthCheck successful!"})
})


export default app;