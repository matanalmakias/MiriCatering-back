import mongoose from "mongoose";

const dailyFoodSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    unique: true,
    enum: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
  },
  mainMeals: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DailyFoodProduct" },
  ],
  additionalDishes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DailyFoodProduct" },
  ],
  saladDishes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DailyFoodProduct" },
  ],
  drinkDishes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DailyFoodProduct" },
  ],
  breadDishes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DailyFoodProduct" },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// מודל
const DailyFood = mongoose.model("DailyFood", dailyFoodSchema);

export default DailyFood;
