import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../db/models/user.js";

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // בדיקה ששדות חובה מולאו
    if (!phoneNumber || !password) {
      return res.status(400).json({ error: "חובה למלא מספר טלפון וסיסמה." });
    }

    // חיפוש המשתמש לפי מספר טלפון
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ error: "משתמש לא נמצא במערכת." });
    }

    // בדיקת סיסמה מול ההצפנה
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "הסיסמה שגויה." });
    }

    // יצירת טוקן JWT
    const token = jwt.sign(
      {
        id: user._id,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_SECRET || "secretKey", // מומלץ לשמור סוד אמיתי בקובץ ENV
      { expiresIn: "30d" }
    );

    // שליחת תשובה ללקוח
    res.status(200).json({
      message: "התחברת בהצלחה!",
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("שגיאה בהתחברות המשתמש:", error);
    res
      .status(500)
      .json({ error: "שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר." });
  }
};

export default login;
