import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const port = process.env.PORT || 3000;

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`, `http://localhost:${port}`);
});
