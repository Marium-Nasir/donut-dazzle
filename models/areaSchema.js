import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    areaName: { type: String, required: true },
    postalCode: { type: String, required: true },
    deliveryCharges: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Area || mongoose.model("Area", areaSchema);
