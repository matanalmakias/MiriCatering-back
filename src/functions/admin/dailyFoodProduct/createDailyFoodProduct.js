import DailyFoodProduct from "../../../db/models/dailyFoodProduct.js";

const createDailyFoodProduct = async (req, res) => {
  try {
    const { name, category } = req.body;

    // בדיקה ששדות חובה מולאו
    if (!name || !category) {
      return res.status(400).json({ error: "יש למלא שם וקטגוריה." });
    }

    // בדיקה אם כבר קיים מוצר עם אותו שם
    const existing = await DailyFoodProduct.findOne({ name });
    if (existing) {
      return res.status(409).json({ error: "מוצר בשם זה כבר קיים במערכת." });
    }

    // יצירת מוצר חדש
    const newDailyFoodProduct = new DailyFoodProduct({ name, category });
    const savedProduct = await newDailyFoodProduct.save();

    // תשובה ללקוח
    res.status(201).json({
      message: "המוצר נוסף בהצלחה.",
      product: savedProduct,
    });
  } catch (error) {
    console.error("שגיאה ביצירת מוצר יומי:", error);
    res
      .status(500)
      .json({ error: "שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר." });
  }
};

export default createDailyFoodProduct;
