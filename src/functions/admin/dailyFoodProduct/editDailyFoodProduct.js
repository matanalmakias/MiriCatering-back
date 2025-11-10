import DailyFoodProduct from "../../../db/models/dailyFoodProduct.js";

const editDailyFoodProduct = async (req, res) => {
  try {
    const { productId, name, category } = req.body;

    // בדיקה שהתקבל מזהה מוצר
    if (!productId) {
      return res.status(400).json({ error: "נדרש מזהה מוצר." });
    }

    // עדכון המוצר עם ולידציה
    const updatedProduct = await DailyFoodProduct.findByIdAndUpdate(
      productId,
      { name, category, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    // בדיקה אם המוצר נמצא
    if (!updatedProduct) {
      return res.status(404).json({ error: "המוצר לא נמצא." });
    }

    // תשובה ללקוח
    res.status(200).json({
      message: "המוצר עודכן בהצלחה.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("שגיאה בעדכון מוצר יומי:", error);
    res
      .status(500)
      .json({ error: "שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר." });
  }
};

export default editDailyFoodProduct;
