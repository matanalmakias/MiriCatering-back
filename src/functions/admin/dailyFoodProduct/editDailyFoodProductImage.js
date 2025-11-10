import fs from "fs";
import path from "path";
import DailyFoodProduct from "../../../db/models/dailyFoodProduct.js";

const editDailyFoodProductImage = async (req, res) => {
  try {
    const { productId } = req.body;
    const imageFile = req.file;

    if (!productId) {
      return res.status(400).json({ error: "נדרש מזהה מוצר." });
    }

    if (!imageFile) {
      return res.status(400).json({ error: "לא נבחרה תמונה להעלאה." });
    }

    // שליפת המוצר הקיים
    const product = await DailyFoodProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "המוצר לא נמצא." });
    }

    // אם כבר קיימת תמונה – מוחקים אותה מהשרת
    if (product.imageUrl) {
      const oldImagePath = path.join(process.cwd(), product.imageUrl);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    // שמירת כתובת התמונה החדשה במסד הנתונים
    const relativePath = `uploads/foods/${imageFile.filename}`;
    product.imageUrl = relativePath;
    product.updatedAt = new Date();
    await product.save();

    res.status(200).json({
      message: "התמונה עודכנה בהצלחה.",
      product,
    });
  } catch (error) {
    console.error("שגיאה בעדכון תמונת מוצר:", error);
    res
      .status(500)
      .json({ error: "שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר." });
  }
};

export default editDailyFoodProductImage;
