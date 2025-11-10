import jwt from "jsonwebtoken";
import User from "../../db/models/user.js";

/**
 * אימות טוקן JWT – בדיקה אם המשתמש מחובר
 */
export const authenticationToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // בדיקה אם נשלח טוקן
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "לא נשלח טוקן אימות." });
    }

    // בדיקת תקינות הטוקן
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

    // חיפוש המשתמש במסד הנתונים
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "המשתמש לא נמצא במערכת." });
    }

    // הוספת המשתמש ל־request
    req.user = {
      id: user._id,
      phoneNumber: user.phoneNumber,
      roles: user.roles || [], // למקרה שנוסיף הרשאות בעתיד
    };

    next();
  } catch (error) {
    console.error("שגיאה באימות טוקן:", error);
    res.status(403).json({ error: "טוקן לא תקין או שפג תוקפו." });
  }
};
