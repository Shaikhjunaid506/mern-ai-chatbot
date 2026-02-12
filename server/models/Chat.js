const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: { type: String, required: true },
  content: { type: String, required: true }
});

const chatSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    messages: [messageSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
