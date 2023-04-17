import mongoose, { Schema, model } from "mongoose";

const farmerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    survey_no: String,
    area: Number,
    phone: String,
    reports_generared: [
      {
        date: { type: Date, default: Date.now() },
        file: String,
      },
    ],
  },
  { timestamps: String }
);

export default  model("farmer", farmerSchema);
