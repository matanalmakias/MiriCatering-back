import DailyFood from "../../../db/models/dailyFood.js";

const deleteDailyFood = async (req, res) => {
  try {
    const { dayId } = req.body;

    // בדיקה שהתקבל מזהה יום
    if (!dayId) {
      return res.status(400).json({ error: "נדרש מזהה יום למחיקה." });
    }

    // ניסיון מחיקה לפי מזהה
    const deletedDay = await DailyFood.findByIdAndDelete(dayId);

    // בדיקה אם נמצא יום למחיקה
    if (!deletedDay) {
      return res.status(404).json({ error: "היום לא נמצא במערכת." });
    }

    // תשובה ללקוח
    res.status(200).json({
      message: "היום נמחק בהצלחה.",
      day: deletedDay,
    });
  } catch (error) {
    console.error("שגיאה במחיקת יום יומי:", error);
    res
      .status(500)
      .json({ error: "שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר." });
  }
};

export default deleteDailyFood;
