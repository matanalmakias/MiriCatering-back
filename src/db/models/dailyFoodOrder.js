import mongoose from "mongoose";

const dailyFoodOrderSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// מודל
const DailyFoodOrder = mongoose.model("DailyFoodOrder", dailyFoodOrderSchema);

export default DailyFoodOrder;
