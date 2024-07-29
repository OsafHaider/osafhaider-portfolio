import { connection, connect } from "mongoose";

const dbConnection = async () => {
  if (connection.readyState >= 1) {
    return;
  }
  try {
    await connect(process.env.DB);
  } catch (error) {
    console.log(error.message, "Error From Mongodb Connection Function");
  }
};

export default dbConnection;
