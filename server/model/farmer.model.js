import mongoose, { Schema, model } from "mongoose";

const farmerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    survey_no: String,
    area: Number,
    phone: String,
    verified: { type: Boolean, default: false },
    reports_generated: [
      {
        count: { type: Number, required: true },
        label: { type: String, required: true },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: String }
);

export default model("farmer", farmerSchema);
