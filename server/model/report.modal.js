import { Schema, model } from "mongoose";

const report_schema = Schema({
  label: String,
  count: String,
  name: String,
  email: String,
  area: Number,
  user_id : String,
  survey_no: String,
});

export default model("report", report_schema);
