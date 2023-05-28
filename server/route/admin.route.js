import { Router } from "express";
import { admin_modal } from "../model/admin.modal.js";

const AdminRouter = Router();

AdminRouter.post("/get-in", async (req, res) => {
  console.log(await admin_modal.find());
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Please enter credentials",
    });
  }
  console.log(email, password);
  const data = await admin_modal.findOne({
    email,
    password,
  });

  if (!data) {
    return res.status(400).json({
      error: true,
      message: "Admin not found",
    });
  }

  data.password = undefined;
  return res.status(400).json({
    error: false,
    data,
    message: "Logged in securely.",
  });
});

export default AdminRouter;
