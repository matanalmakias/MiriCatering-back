import { Router } from "express";
import createDailyFoodProduct from "../functions/admin/dailyFoodProduct/createDailyFoodProduct.js";
import editDailyFoodProduct from "../functions/admin/dailyFoodProduct/editDailyFoodProduct.js";
import deleteDailyFoodProduct from "../functions/admin/dailyFoodProduct/deleteDailyFoodProduct.js";
import { authenticationToken } from "../middlewares/auth/authenticationToken.js";
import { isAdmin } from "../middlewares/auth/isAdmin.js";
import createDailyFood from "../functions/admin/dailyFood/createDailyFood.js";
import uploadFoodImage from "../middlewares/utils/uploadFoodImage.js";
import editDailyFoodProductImage from "../functions/admin/dailyFoodProduct/editDailyFoodProductImage.js";
import editDailyFood from "../functions/admin/dailyFood/editDailyFood.js";
import deleteDailyFood from "../functions/admin/dailyFood/deleteDailyFood.js";

const router = Router();

// Daily Food Product Routes START
router.post(
  "/createDailyFoodProduct",
  authenticationToken,
  isAdmin,
  createDailyFoodProduct
);
router.put(
  "/editDailyFoodProduct",
  authenticationToken,
  isAdmin,
  editDailyFoodProduct
);
router.put(
  "/editDailyFoodProductImage",
  authenticationToken,
  isAdmin,
  uploadFoodImage.single("image"),
  editDailyFoodProductImage
);
router.delete(
  "/deleteDailyFoodProduct",
  authenticationToken,
  isAdmin,
  deleteDailyFoodProduct
);
// Daily Food Product Routes END

// Daily Food Routes START
router.post("/createDailyFood", authenticationToken, isAdmin, createDailyFood);
router.put("/editDailyFood", authenticationToken, isAdmin, editDailyFood);
router.delete(
  "/deleteDailyFood",
  authenticationToken,
  isAdmin,
  deleteDailyFood
);
// Daily Food Routes END

export { router as adminRouter };
