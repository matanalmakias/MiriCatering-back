import mongoose from "mongoose";
import dbConfig from "./config/db.config.js";
import dotenv from "dotenv";
dotenv.config();

const { HOST, DB, PORT, ROLES } = dbConfig;

const connect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);

  console.log(`Succesfully connected to the database ${DB}`);
};

export { connect };
