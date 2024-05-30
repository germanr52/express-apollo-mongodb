// const { Schema, model } = require("mongoose");

import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

export default model("Task", taskSchema);

// module.exports = model("Task", taskSchema);
