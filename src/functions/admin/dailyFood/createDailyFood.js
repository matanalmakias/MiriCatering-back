import DailyFood from "../../../db/models/dailyFood.js";

const createDailyFood = async (req, res) => {
  try {
    const { day } = req.body;

    // בדיקה ששדה היום מולא
    if (!day) {
      return res.status(400).json({ error: "יש להזין שם יום." });
    }

    // בדיקה אם היום כבר קיים
    const existingDay = await DailyFood.findOne({ day });
    if (existingDay) {
      return res.status(409).json({ error: "היום הזה כבר קיים במערכת." });
    }

    // יצירת יום חדש
    const newDay = new DailyFood({ day });
    const savedDay = await newDay.save();

    res.status(201).json({
      message: "היום נוסף בהצלחה.",
      day: savedDay,
    });
  } catch (error) {
    console.error("שגיאה ביצירת יום יומי:", error);
    res
      .status(500)
      .json({ error: "שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר." });
  }
};

export default createDailyFood;
