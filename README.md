
# 🤖 Chal P👀ch Ai – Conversational Gemini Chatbot

> "Chal Pooch Ai" is a modern, responsive, AI-powered chatbot interface built with **React**, **TypeScript**, and **Tailwind CSS**, and uses **Google's Gemini API** to generate intelligent conversational responses. Designed for speed, simplicity, and an interactive user experience.



## 🎯 Objective

The goal of this project was to:

* Build a functional AI chatbot similar to ChatGPT
* Integrate Google’s Gemini API to generate conversational responses
* Practice using modern web technologies like React, Vite, Tailwind, and TypeScript
* Explore UI/UX design with features like Dark Mode and trending conversation starters

---

## 🧩 Key Features

| Feature                        | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| ✨ **AI-Powered Conversations** | Uses Gemini API to generate smart, human-like replies       |
| 🌓 **Dark / Light Mode**       | Theme switcher using `ThemeContext`                         |
| 📱 **Responsive UI**           | Tailwind CSS ensures mobile-friendly design                 |
| 🗨️ **Typing Indicator**       | Shows assistant "typing..." animation                       |
| 🔥 **Trending Topics**         | Predefined conversation starters with category-based images |
| 🎯 **Minimalist Chat Design**  | Clean, focused UX for conversations                         |
| 🚀 **Fast Dev Workflow**       | Powered by Vite for fast HMR and build                      |

---

## 🛠 Tech Stack

| Tech             | Usage                                 |
| ---------------- | ------------------------------------- |
| **React**        | Component-based frontend architecture |
| **TypeScript**   | Static type-checking                  |
| **Tailwind CSS** | Styling and responsive layout         |
| **Vite**         | Fast dev server and build tool        |
| **Gemini API**   | AI backend (from Google)              |
| **Axios**        | API requests to Gemini endpoint       |

---

## 📁 Project Structure

```plaintext
finalProjectAi/
├── public/                       # Static assets (preview images, favicon)
├── src/
│   ├── components/               # ChatInput, MessageItem, Sidebar, TypingIndicator, etc.
│   ├── context/ThemeContext.tsx # Dark/light mode context provider
│   ├── App.tsx                  # Main logic (chat, API call, layout)
│   ├── index.tsx                # Root render entry
├── .env                         # Local environment variables (not committed)
├── .gitignore                   # Ignores .env and node_modules
├── vite.config.ts               # Vite configuration
└── README.md                    # This file
```

---

## 🔐 Environment Setup

You must store your **Gemini API key** in an `.env` file like so:

```bash
# .env
VITE_GEMINI_API_KEY=your_real_google_api_key
```

> ⚠️ Do **not expose** this key publicly. Avoid pushing `.env` to GitHub. This key is exposed to the browser and should be restricted (via domains/IPs) in the Google Cloud Console.

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chal-pooch-ai.git
cd chal-pooch-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file with your API key

```bash
touch .env
# Add the line below into it:
VITE_GEMINI_API_KEY=your_google_api_key
```

### 4. Start the dev server

```bash
npm run dev
```

Visit `http://localhost:5173/` to see the app.

---

## 🌍 Deployment (Vercel/Netlify)

If deploying to **Vercel**:

1. Go to your project’s dashboard.
2. Navigate to **Settings → Environment Variables**.
3. Add a new variable:

   * **Key**: `VITE_GEMINI_API_KEY`
   * **Value**: your actual Gemini API key
4. Deploy or re-deploy the project.

> 🔒 Make sure to restrict your Gemini key to your domain to prevent abuse.

---

## 🔧 How It Works

### 🔁 API Flow

1. User submits a message via input.
2. Request is sent to:
   `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
3. Google Gemini API responds with a generated reply.
4. Reply is added to the chat and displayed on screen.

### 📂 Components Breakdown

* `ChatInput.tsx`: Chat input with send button
* `MessageItem.tsx`: Chat bubble for user/assistant
* `TypingIndicator.tsx`: Dots animation while loading
* `Sidebar.tsx`: Trending topics and dark mode toggle
* `ThemeContext.tsx`: Manages app theme (light/dark)

---

## 🧪 Sample Use Cases

* 🔍 Ask factual questions: *"What is quantum computing?"*
* 🧠 Brainstorm ideas: *"Give me startup ideas for 2025"*
* 🧑‍🏫 Learn concepts: *"Explain generative AI in simple terms"*
* 😂 Fun chat: *"Tell me a tech-related joke"*

---

## 📌 Notes for Future You (or Other Developers)

* The key `VITE_GEMINI_API_KEY` is visible in browser builds → **don't use this for sensitive or billing-heavy deployments**.
* For secure production use: **Move API logic to a backend** (e.g., Node.js, Express, or Next.js API routes).
* You can expand this project by:

  * Adding chat history with localStorage or backend
  * Using authentication (e.g., Firebase Auth)
  * Supporting voice input (Web Speech API)

---

## 🧱 To-Do / Improvements

* [ ] Add persistent chat history
* [ ] Add markdown rendering (for code blocks, links)
* [ ] Export chat as text/pdf
* [ ] Add loading skeletons for better UX
* [ ] Improve mobile UX with bottom drawer for input

---

## 📃 License

This project is open-sourced under the MIT License.
Feel free to modify, extend, and share it.

---

## 👨‍💻 Author

Dependra Singh – Developer & Tech Enthusiast
🌐 [MyPortfolio.com](https://dependrasingh027.netlify.app/)
📫 [hello@dependra](mailto:dependrasingh027@gmail.com)

---

## 🌐 Links

* Live Demo: https://chal-pooch-biuem0n9p-dependra-singhs-projects.vercel.app/

