const express = require("express");
const router = express.Router();

const { chatWithAI, getHistory } = require("../controllers/chatController");

router.post("/chat", chatWithAI);
router.get("/history/:sessionId", getHistory);

module.exports = router;
