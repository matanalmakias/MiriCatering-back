import mongoose from "mongoose";

const dailyFoodProductSchema = new mongoose.Schema({
  name: { type: String, unique: true, default: "" },
  category: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// מודל
const DailyFoodProduct = mongoose.model(
  "DailyFoodProduct",
  dailyFoodProductSchema
);

export default DailyFoodProduct;
