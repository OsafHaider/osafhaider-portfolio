import { connection, connect } from "mongoose";

const dbConnection = async () => {
  if (connection.readyState >= 1) {
    console.log("mongodb already connected");
    return;
  }
  try {
    connect(process.env.MONGODB_URL);
    console.log("Mongodb Connected!!");
  } catch (error) {
    console.log(error, "Error From Mongodb Connection Function");
  }
};

export default dbConnection;
