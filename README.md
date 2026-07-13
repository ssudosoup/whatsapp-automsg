# 🤖 My Work-Mode WA Auto-Responder

Hey there! Welcome to my personal WhatsApp auto-reply bot repository. 

I built this little project because I often find myself deep in "focus mode" or buried in work while using WhatsApp Web. To prevent leaving my clients, colleagues, or friends hanging—and to stop them from worrying—this bot steps in to act as my friendly automated assistant when I'm away from my phone.

It's casual, simple, and tailored to my personal workflow, but feel free to clone it, tweak it, and use it for yourself!

---

## ✨ Features Built-In

*   **Anti-Spam Human Mimicry:** Instead of replying instantly (which screams *robot* and risks triggering WhatsApp's anti-spam flags), this bot triggers a **"typing..."** status and waits for a **random delay between 3 to 7 seconds** before sending out the reply. It looks completely natural!
*   **Session Persistence:** Powered by `LocalAuth`, you only need to scan the QR code **once**. It saves the session locally so it logs right back in the next time you boot it up.
*   **Selective Answering:** It automatically ignores group chats and messages sent by yourself, so it won't mess up your active group discussions.

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) installed on your machine.

### 1. Clone & Install
```bash
# Clone this repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Install the dependencies (this might take a minute as it installs Chromium for Puppeteer)
npm install
```

### 2. Configure Your Keywords
Open up `index.js` and look for the `client.on('message', ...)` block. You can change the keywords or customize the auto-reply messages to match your vibe or language. Right now, it handles basic variations like:
*   Greeting signals (`"halo"`, `"p"`)
*   High-priority keywords (`"urgent"`, `"penting"`)

### 3. Run It
```bash
node index.js
```
Scan the QR code printed in your terminal using your phone's WhatsApp (**Linked Devices > Link a Device**), and you're good to go!

---

## 💡 Customization & AI Integration Note

This is a **basic, rule-based version** using simple `if/else` conditional logic. It is lightweight, straightforward, and works perfectly for setting static away-messages. 

**Want to make it smarter? 🧠**
If you want this bot to actually understand context, chat casually, or answer complex work-related questions instead of just saying "I am busy," you can easily upgrade it! 

You can drop in an AI SDK like **Google Gemini API** (`@google/genai`) or **OpenAI API** right inside the `try` block. Just feed the incoming `msg.body` into the AI model, get the generated text response, and pass it into `msg.reply()`. 

Feel free to fork this repo and turn it into your own fully intelligent AI clone!

---

## 📝 Disclaimer
This project uses `whatsapp-web.js`, which is an unofficial automation library. Use it responsibly and avoid blasting automated messages to hundreds of unknown contacts to keep your account safe from being flagged by WhatsApp.

Happy coding! ✨
