import { Router } from "express";
import reportModal from "../model/report.modal.js";

const ReportRouter = Router();

ReportRouter.post("/", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  if (!payload.count || !payload.area || !payload.survey_no || !payload._id) {
    return res
      .status(400)
      .send({ error: true, message: "Parameters are missing." });
  }
  const user_id = payload._id;
  payload._id = undefined;
  const akg = await reportModal.create({ ...payload, user_id });
  res.status(200).json({
    error: false,
    message: "Report saved successfully.",
  });
});

ReportRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const akg = await reportModal.find({
    user_id: id,
  });
  res.status(200).json({
    error: false,
    data: akg,
    message: "Reports fetched successfully.",
  });
});

ReportRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const akg = await reportModal.deleteOne({
    _id: id,
  });
  res.status(200).json({
    error: false,
    data: akg,
    message: "Report deleted successfully.",
  });
});
export default ReportRouter;
