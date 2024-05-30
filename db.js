//const { connect } = require("mongoose");

import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);

    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

// export default connectDB;
//module.exports = { connectDB };
