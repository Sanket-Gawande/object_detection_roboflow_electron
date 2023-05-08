import { Schema, model } from "mongoose";

const report_schema = new Schema(
  {
    label: String,
    count: String,
    name: String,
    email: String,
    area: Number,
    user_id: String,
    survey_no: String,
  },
  { timestamps: true }
);

export default model("report", report_schema);
