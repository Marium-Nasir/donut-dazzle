import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: null },
    contactNumber: { type: String, default: null },
    address: { type: String, default: null },
    gender: { type: String, default: null },
    role: {
      type: String,
      enum: ["admin", "staff", "customer"],
      default: "customer",
    },
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
export default mongoose.models.User || mongoose.model("User", userSchema);
