import { Schema, model } from "mongoose";

const admin_schema = Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  verified: Boolean,
  role: {
    type: String,
    default: "admin",
  },
});

export const admin_modal = model("admin", admin_schema);
