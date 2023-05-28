import { Router } from "express";
import reportModal from "../model/report.modal.js";
import farmerModel from "../model/farmer.model.js";

const ReportRouter = Router();

/**
 * @param count (required)
 * @param label (required)
 * @param farmer_id (required)
 * @return {error :boolean,  message : string}
 */

ReportRouter.post("/", async (req, res) => {
  console.log(req.body);
  const payload = req.body;
  console.log(payload);
  if (!payload.count || !payload.label || !payload.farmer_id) {
    return res
      .status(400)
      .send({ error: true, message: "Parameters are missing." });
  }
  const _id = payload.farmer_id;
  payload.farmer_id = undefined;
  const akg = await farmerModel.updateOne(
    { _id },
    {
      $push: { reports_generated: payload },
    },
    {
      upsert: true,
    }
  );

  res.status(200).json({
    error: false,
    message: "Report saved successfully.",
  });
});

ReportRouter.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  const akg = await farmerModel.findOne(
    {
      _id,
    },
    {
      reports_generated: 1,
    }
  );
  res.status(200).json({
    error: false,
    data: akg?.reports_generated || [],
    message: "Reports fetched successfully.",
  });
});


/**
 * @param {fid} string
 * @param {rid} string
 */
ReportRouter.delete("/:fid/:rid", async (req, res) => {
  const { fid: _id, rid } = req.params;
  const akg = await farmerModel.findOneAndUpdate(
    { _id },
    {
      $pull: {
        reports_generated: {
          _id: rid,
        },
      },
    }
  );
  console.log(_id, akg);
  res.status(200).json({
    error: false,
    data: null,
    message: "Report deleted successfully.",
  });
});
export default ReportRouter;
