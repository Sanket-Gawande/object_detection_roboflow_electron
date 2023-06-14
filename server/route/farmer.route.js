import { Router } from "express";
import farmerModel from "../model/farmer.model.js";
import jwt from "jsonwebtoken";
const FarmerRouter = Router();

FarmerRouter.post("/register", async (req, res) => {
  const { payload } = req.body;

  if (!payload) {
    return res.status(400).send({
      success: true,
      message: "All fields are required",
    });
  }
  const akg = await farmerModel.create(payload);

  return res.status(200).send({
    success: true,
    message: "Account created successfully. You can login now.",
  });
});

FarmerRouter.post("/login", async (req, res) => {
  const { payload } = req.body;
  const { email, password } = payload;

  const akg = await farmerModel.findOne({ email, password });

  if (!akg) {
    return res.status(400).send({
      success: false,
      message: "Invalid email and password.",
    });
  }
  akg.password = undefined;
  const token = "Sanket"; //jwt.sign(akg, process.env.JWT_SECRET);
  return res
    .status(200)
    .cookie("token", token, { secure: true, maxAge: 86400 })
    .send({ success: true, message: "Logeed in.", farmer: akg });
});

FarmerRouter.post("/farmer/update", async (req, res) => {
  const { payload } = req.body;
  console.log(payload);
  return;
  const akg = await farmerModel.updateOne({ _id: payload.id });

  if (!payload._id) {
    return res.status(400).send({
      success: false,
      message: "Please add missing parameters.",
    });
  }

  akg.password = undefined;
  const token = "Sanket"; //jwt.sign(akg, process.env.JWT_SECRET);
  return res
    .status(200)
    .cookie("token", token, { secure: true, maxAge: 86400 })
    .send({
      success: true,
      message: "Profile updated successfully",
      farmer: akg,
    });
});

export default FarmerRouter;
