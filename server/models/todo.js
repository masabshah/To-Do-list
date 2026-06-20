const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      default: "Medium",
    },

    dueDate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);