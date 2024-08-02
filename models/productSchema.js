import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    category: {
      type: String,
      enum: ["drinks", "donuts", "others"],
      default: "others",
    },
    productImage: { type: String },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: User,
    //   default: null,
    // },
    // updatedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: User,
    //   default: null,
    // },
    // deletedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: User,
    //   default: null,
    // },
  },
  { timestamps: true }
);
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
