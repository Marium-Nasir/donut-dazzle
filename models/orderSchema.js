import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderTakerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    area: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true },
    deliveryAddress: { type: String, required: true, default: null },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "declined",
        "delivered",
        "cancelled",
        "ready",
        "dispatch",
      ],
      default: "pending",
    },
    cancelationReason: { type: String, default: null },
    declinedReason: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
