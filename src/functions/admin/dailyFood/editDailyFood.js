import DailyFood from "../../../db/models/dailyFood.js";

const editDailyFood = async (req, res) => {
  try {
    const { dayId, ...updatedFields } = req.body;

    // בדיקה שקיים מזהה יום
    if (!dayId) {
      return res.status(400).json({ error: "נדרש מזהה יום לעדכון." });
    }

    // עדכון כל האובייקט לפי מה שהגיע מהלקוח
    const updatedDay = await DailyFood.findByIdAndUpdate(
      dayId,
      { ...updatedFields, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    // אם לא נמצא יום
    if (!updatedDay) {
      return res.status(404).json({ error: "היום לא נמצא במערכת." });
    }

    res.status(200).json({
      message: "היום עודכן בהצלחה.",
      day: updatedDay,
    });
  } catch (error) {
    console.error("שגיאה בעדכון יום יומי:", error);
    res
      .status(500)
      .json({ error: "שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר." });
  }
};

export default editDailyFood;
