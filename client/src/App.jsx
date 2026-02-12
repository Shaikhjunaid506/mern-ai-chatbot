import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./style.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const bottomRef = useRef(null);
  const sessionId = "default-session";

  // Load chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/history/${sessionId}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };

    fetchHistory();
  }, []);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle dark/light theme
  useEffect(() => {
    document.body.className = darkMode ? "dark-bg" : "light-bg";
  }, [darkMode]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText },
    ]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: userText,
          sessionId,
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: res.data.reply },
      ]);
    } catch (error) {
      console.error("AI request failed:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Something went wrong. Please try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="header">
        <h2>NeuroChat AI</h2>

        <button onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="message ai">
            <span className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something..."
        />

        <button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default App;
