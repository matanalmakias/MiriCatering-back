import multer from "multer";
import path from "path";
import fs from "fs";

// תיקייה לשמירת התמונות
const uploadPath = "uploads/foods";

// יצירת התיקייה אם לא קיימת
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// הגדרת אחסון הקובץ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `food-${uniqueSuffix}${ext}`);
  },
});

// סינון סוגי קבצים (רק תמונות)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("ניתן להעלות רק קבצי תמונה."), false);
};

const uploadFoodImage = multer({ storage, fileFilter });

export default uploadFoodImage;
