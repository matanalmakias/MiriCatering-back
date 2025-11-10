import mongoose from "mongoose";
import dbConfig from "./config/db.config.js";
import dotenv from "dotenv";
dotenv.config();

const { HOST, DB, PORT, ROLES } = dbConfig;

const connect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
  // await mongoose.connect(
  //   `mongodb+srv://inviteserv:WrI2zDwliVY986m2@cluster0.muivjeh.mongodb.net/TradingBot`
  // );
  // await mongoose.connect(
  //   `mongodb://admin:RashenoreikSIsdisadi82387462621@127.0.0.1:27017/TradingBot?authSource=admin`
  // );
  console.log(`Succesfully connected to the database ${DB}`);
};

export { connect };
