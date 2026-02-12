# 🚀 MERN AI Chatbot

A full-stack Generative AI Chatbot built using the MERN stack (MongoDB, Express, React, Node.js) integrated with Google Gemini API.

This project provides a modern AI chat interface where users can send prompts and receive AI-generated responses with persistent chat history.

---

## 📌 Features

- 🔥 Real-time AI responses (Google Gemini API)
- 💬 Chat-style UI (User & AI messages clearly separated)
- 🗂 Session-based chat history
- 💾 MongoDB persistent storage
- 🌗 Dark / Light mode toggle
- ⏳ Typing animation indicator
- 🔄 Auto-scroll to latest message
- 📱 Responsive and clean UI

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Axios
- Custom CSS (Glass UI Design)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Google Generative Language API (Gemini 2.5 Flash)

---

## 🧠 How It Works

1. User sends a message from the React frontend.
2. The backend receives the message via `/api/chat`.
3. Backend forwards the prompt to Gemini API.
4. AI response is received.
5. Both user & AI messages are stored in MongoDB.
6. Chat history is fetched via `/api/history/:sessionId`.
7. Messages are rendered on the UI.

---

## 🗄 Database Schema

Each session is stored as:

```json
{
  "sessionId": "default-session",
  "messages": [
    { "role": "user", "content": "Hello" },
    { "role": "ai", "content": "Hi there!" }
  ],
  "createdAt": "...",
```
This ensures:

Structured chat history

Session-based retrieval

Scalable architecture


📷 Screenshots
🌙 Dark Mode

☀ Light Mode

💬 Chat in Action
  "updatedAt": "..."
}



## ⚙️ Installation & Setup
1️⃣ Clone Repository
```bash
 git clone https://github.com/YOUR_USERNAME/mern-ai-chatbot.git
cd mern-ai-chatbot
```
2️⃣ Setup Backend
```bash
cd server
npm install
```
Create .env file inside server:
```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/chatbot
GEMINI_API_KEY=your_gemini_api_key
```
Run backend
```bash
node server.js
```
3️⃣ Setup Frontend
``` bash
cd client
npm install
npm run dev
```
## 🌍 API Endpoints
POST /api/chat

Send user prompt and receive AI response.

GET /api/history/:sessionId

Fetch chat history of a session.

 ## 📁 Project Structure
 mern-ai-chatbot/<br>
│
├── client/<br>
│   ├── src/<br>
│   ├── style.css<br>
│<br>
├── server/<br>
│   ├── models/<br>
│   ├── routes/<br>
│   ├── controllers/<br>
│   └── server.js<br>
│<br>
└── README.md<br>
 ## 👨‍💻 Author

Developed by Junaid Hussain
B.Tech IT | MERN Stack Developer | AI Enthusiast


