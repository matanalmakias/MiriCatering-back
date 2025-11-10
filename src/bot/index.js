// botPoll.js
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TELEGRAM_BOT; // ודא שזה טוקן ייחודי לבוט הזה בלבד
export const telegramInstance = new TelegramBot(token, { polling: true });

telegramInstance.on("message", (msg) => {
  const chatId = msg.chat.id;
  telegramInstance.sendMessage(chatId, "הודעה התקבלה!");
});

telegramInstance.on("message", (msg) => {
  console.log("Chat ID:", msg.chat.id);
  telegramInstance.sendMessage(
    msg.chat.id,
    `ה-Chat ID שלך הוא: ${msg.chat.id}`
  );
});
