export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "לא נמצא משתמש מאומת." });
    }

    // בדיקה אם למשתמש יש תפקיד 'admin'
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ error: "אין לך הרשאה לבצע פעולה זו." });
    }

    next();
  } catch (error) {
    console.error("שגיאה בבדיקת הרשאות אדמין:", error);
    res.status(500).json({ error: "שגיאת שרת פנימית." });
  }
};
