import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    productIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    quantity: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true, default: 0 },
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amount",
      required: true,
    },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Cart || mongoose.model("Cart", addToCartSchema);
