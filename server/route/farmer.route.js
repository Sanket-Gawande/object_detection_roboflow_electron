import { Router } from "express";
import farmerModel from "../model/farmer.model.js";
import jwt from "jsonwebtoken";
import { send_mail } from "../mail/transporter.js";
const FarmerRouter = Router();

//  get farmers
FarmerRouter.get("/", async (req, res) => {
  try {
    const data = await farmerModel.find();
    return res
      .status(200)
      .json({ success: true, data, message: "Farmers fetched successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong." });
  }
});

// get farmer by id
FarmerRouter.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  const farmer = await farmerModel.findOne({ _id });
  if (!farmer) {
    return res.status(400).send({
      error: true,
      message: "Invalid farmer.",
    });
  }
  farmer.password = undefined;
  return res.status(200).send({
    error: false,
    data: farmer,
    message: "Farmer fetched successfully.",
  });
});

//  create farmers
FarmerRouter.post("/", async (req, res) => {
  const { payload } = req.body;

  if (!payload) {
    return res.status(400).send({
      error: true,
      message: "All fields are required",
    });
  }
  const otp = Math.random().toString().slice(-4);

  req.session[payload.email] = otp;
  await send_mail(payload.email, `Please verify your email using otp : ${otp}`);
  const akg = await farmerModel.create(payload);
  akg.password = undefined;
  return res.status(200).send({
    success: true,
    data: akg,
    message:
      "Account created, Please verify account using OTP just sent to your account.",
  });
});

// login route
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
  if (!akg.verified) {
    return res.status(400).send({
      success: false,
      message: "Account is not verified.",
    });
  }

  akg.password = undefined;
  const token = "Sanket"; //jwt.sign(akg, process.env.JWT_SECRET);
  return res
    .status(200)
    .cookie("token", token, { secure: true, maxAge: 86400 })
    .send({ success: true, message: "Logeed in.", farmer: akg });
});

// verify otp using email
FarmerRouter.post("/verify", async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res
        .status(400)
        .json({ error: true, message: "Please enter both email and otp" });
    }
    const existing_otp = req.session[email];
    if (!(existing_otp == otp)) {
      return res
        .status(401)
        .json({ error: true, message: "OTP is invalid or expired" });
    }
    // verify farmer if otp matches
    if (existing_otp == otp) {
      await farmerModel.findOneAndUpdate(
        { email },
        {
          $set: {
            verified: true,
          },
        }
      );
      req.session[email] = undefined;
      return res.status(200).json({
        error: false,
        message: "Account verified sussessfully, you can login now.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Something went wrong",
    });
  }
});

// delete farmers profile
FarmerRouter.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  const akg = await farmerModel.deleteOne({ _id });
  console.log(_id, akg);
  if (!_id) {
    return res.status(400).send({
      success: false,
      message: "Invalid farmer.",
    });
  }

  return res.status(200).send({
    success: true,
    message: "01 Farmer profile deleted successfully.",
  });
});

// forgot password request
FarmerRouter.post("/forgot-password-request", async (req, res) => {
  const { email } = req.body;
  try {
    const otp = Math.random().toString().slice(-4);
    req.session[email] = `password_request_${otp}`;
    await send_mail(
      email,
      `Forgot password request. Use otp to reset password: ${otp}`
    );
    console.log(req.session);
    return res.status(200).send({
      error: false,
      message: "Please verify otp sent to your email",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: true, message: "Failed to reset password." });
  }
});

// update password if otp verifies
FarmerRouter.post("/forgot-password", async (req, res) => {
  const { otp, email, password } = req.body;
  if (!otp || !email || !password) {
    return res.status(201).json({
      error: true,
      message: "Are parameters are required, email, otp,  new password ",
    });
  }

  console.log(req.session);
  const otp_in_session = req.session[email];
  console.log(otp_in_session, `password_request_${otp}`);
  if (!(otp_in_session === `password_request_${otp}`)) {
    return res.status(400).json({
      error: true,
      message: "Invalid or expired otp",
    });
  }
  if (otp_in_session === `password_request_${otp}`) {
    await farmerModel.updateOne(
      { email },
      {
        $set: {
          password,
        },
      }
    );
    req.session[email] = undefined;
    return res.status(200).json({
      error: false,
      message: "Password updated successfully, Please login",
    });
  }
  res.end();
});

//  profile update
FarmerRouter.post("/update", async (req, res) => {
  const payload = req.body;
  try {
    const data = await farmerModel.findOneAndUpdate(
      {
        _id: payload._id,
      },
      {
        $set: {
          ...payload,
        },
      }
    );
    console.log(data, payload);
    return res.status(200).json({
      error: false,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: true,
      message: "Failed to update profile",
    });
  }
});
export default FarmerRouter;
