import { Router } from "express";
import { authenticationToken } from "../middlewares/auth/authenticationToken.js";
import createDailyFoodOrder from "../functions/user/orders/dailyFood/createDailyFoodOrder.js";

const router = Router();
router.post("/createDailyFoodOrder", authenticationToken, createDailyFoodOrder);

export { router as ordersRouter };
