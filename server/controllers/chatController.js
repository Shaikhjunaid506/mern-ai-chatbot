const axios = require("axios");
const Chat = require("../models/Chat");

const chatWithAI = async (req, res) => {
  const { message, sessionId } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: message }]
          }
        ]
      }
    );

    const text =
      response.data.candidates[0].content.parts[0].text;

    let chat = await Chat.findOne({ sessionId });
    if (!chat) chat = new Chat({ sessionId, messages: [] });

    chat.messages.push({ role: "user", content: message });
    chat.messages.push({ role: "ai", content: text });

    await chat.save();

    res.json({ reply: text });

  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ error: "AI request failed" });
  }
};

const getHistory = async (req, res) => {
  const chat = await Chat.findOne({ sessionId: req.params.sessionId });
  res.json(chat ? chat.messages : []);
};

module.exports = {
  chatWithAI,
  getHistory
};
