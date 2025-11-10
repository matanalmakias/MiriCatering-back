import DailyFoodProduct from "../../../db/models/dailyFoodProduct.js";

const deleteDailyFoodProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    // בדיקה שהתקבל מזהה מוצר
    if (!productId) {
      return res.status(400).json({ error: "נדרש מזהה מוצר." });
    }

    // ניסיון מחיקה לפי מזהה
    const deletedProduct = await DailyFoodProduct.findByIdAndDelete(productId);

    // בדיקה אם נמצא מוצר למחיקה
    if (!deletedProduct) {
      return res.status(404).json({ error: "המוצר לא נמצא." });
    }

    // תשובה ללקוח
    res.status(200).json({
      message: "המוצר נמחק בהצלחה.",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("שגיאה במחיקת מוצר יומי:", error);
    res
      .status(500)
      .json({ error: "שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר." });
  }
};

export default deleteDailyFoodProduct;
