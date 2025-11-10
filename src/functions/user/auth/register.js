import bcrypt from "bcrypt";
import User from "../../../db/models/user.js";

const register = async (req, res) => {
  try {
    const { phoneNumber, password, name, lastName, email } = req.body;

    // בדיקה ששדות חובה מולאו
    if (!phoneNumber || !password) {
      return res.status(400).json({ error: "חובה למלא מספר טלפון וסיסמה." });
    }

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "משתמש עם מספר טלפון זה כבר קיים במערכת." });
    }

    // הצפנת סיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת משתמש חדש
    const newUser = new User({
      phoneNumber,
      password: hashedPassword,
      name,
      lastName,
      email,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "נרשמת בהצלחה!",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        lastName: savedUser.lastName,
        phoneNumber: savedUser.phoneNumber,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("שגיאה בהרשמת המשתמש:", error);
    res.status(500).json({ error: "שגיאת שרת פנימית. נסה שוב מאוחר יותר." });
  }
};

export default register;
