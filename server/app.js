import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import FarmerRouter from "./route/farmer.route.js";
import ReportRouter from "./route/report.route.js";
import mongoose from "mongoose";
import expressSession from "express-session";
dotenv.config();

const app = express();
app.use(expressSession({
  secret : process.env.SESSION_SECRET,
  saveUninitialized : false,
  resave : false,
  
}))
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/api/farmer", FarmerRouter);
app.use("/api/report", ReportRouter);

dotenv.config();

const port = process.env.PORT || 1234;

const api = `https://detect.roboflow.com/${process.env.MODEL_AND_VERSION}?api_key=${process.env.API_KEY}`;
app.post("/api/v1/count", async (req, res) => {
  const request = await fetch(api, {
    method: "POST",
    body: req.body.image,

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = await request.json();

  res.status(201).json({
    status: "success",
    data,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected.");
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port}`,
        `http://localhost:${port}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
