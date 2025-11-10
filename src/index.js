import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./db/connect.js";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import { userRouter } from "./routes/user.js";

import defaultConfig from "./defaults/defaultConfig.js";
import myEmitter from "./nodeEvents/nodeEvents.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { adminRouter } from "./routes/admin.js";

const app = express();
app.set("trust proxy", 1); // <— חשוב אם יש פרוקסי
app.use(helmet()); // <— שכולל כותרות אבטחה

// Rate limiter גלובלי
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
// Connect to the database
connect().catch((e) => console.error("Database connection error:", e));

// Middleware
app.use(
  cors({
    origin: "*", // או שים כתובת ספציפית במקום '*'
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);

// Not found middleware
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Port configuration
const PORT = process.env.PORT || 3004;

// Function to start the server
const startServer = (port) => {
  const server = app
    .listen(port, "0.0.0.0", async () => {
      console.log(`HTTP server is running on port ${port}`);

      // ✅ מפעיל את defaultConfig רק אחרי שהשרת פעיל
      try {
        await defaultConfig();

        console.log("✅ defaultConfig completed.");
      } catch (err) {
        console.error("❌ Error in defaultConfig:", err.message);
      }
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Retrying...`);
        setTimeout(() => startServer(port + 1), 1000); // Retry with next port
      } else {
        console.error("Unhandled server error:", err);
      }
    });

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    allowEIO3: true,
  });

  // מאזין פעם אחת בלבד — מחוץ ל־connection!
  myEmitter.on("user-details-update", (user) => {
    if (user._id) {
      io.to(user._id.toString()).emit("user-details-update", user);
    }
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // כאן תשלוף את ה־userId מה־token (או תעביר אותו מהקליינט)
    const userId = socket.handshake.auth.userId; // נניח שאתה שולח אותו ככה מהקליינט
    if (userId) {
      socket.join(userId); // מצרף את הסוקט לחדר של המשתמש שלו
      console.log(`Socket ${socket.id} joined room ${userId}`);
    }

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

// יצירת מופע Socket.IO

// Start the server
startServer(PORT);
