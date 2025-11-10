import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    lastName: { type: String, trim: true },
    password: { type: String, required: true },
    email: { type: String, trim: true },
    roles: { type: [String], default: ["user"] },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true } // יוצר אוטומטית createdAt ו-updatedAt
);

const User = mongoose.model("User", userSchema);
export default User;
