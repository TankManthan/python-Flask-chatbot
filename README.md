<p align="center">
  <img src="static/project_logo.png" width="160">
</p>

<p align="center">A modern, ChatGPT-styled chatbot powered by Python + Flask with live search (Wikipedia + DuckDuckGo) and smart summarization.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.9+-blue?logo=python">
  <img src="https://img.shields.io/badge/Flask-Backend-green?logo=flask">
  <img src="https://img.shields.io/badge/Frontend-HTML%20%2F%20CSS%20%2F%20JS-orange?logo=javascript">
  <img src="https://img.shields.io/badge/License-MIT-purple">
</p>

---

## 📸 Preview

<p align="center">
  <img src="static/preview_light.png" width="85%">
</p>

### 🌙 Dark Mode

<p align="center">
  <img src="static/preview_dark.png" width="85%">
</p>

---

## ✨ Features

- 💬 **ChatGPT-style UI/UX**
- 🔍 **Live search from Wikipedia + DuckDuckGo**
- 🧠 **Smart 3–4 line summarizer**
- ⚡ **Typing animation like ChatGPT**
- 🌙 **Dark / Light mode toggle**
- 📱 **Fully mobile responsive**
- 📤 **Chat export (TXT)**
- ✏️ **Auto-expanding input box**
- 🚫 **No API key required**
- 🆓 **Completely free & open-source**

---

## 🛠 Installation

### 1️⃣ Clone the repository
git clone https://github.com/yourusername/python-chatbot.git
cd python-chatbot

###2️⃣ Install dependencies
pip install -r requirements.txt

###3️⃣ Run the server
python app.py

###4️⃣ Open in browser
http://127.0.0.1:5000

---

## 🔍 How It Works
1. User enters a query
2. Backend fetches:
  Wikipedia summary
  DuckDuckGo instant answers
3. Results are cleaned & merged
4. Summarizer returns a 3–4 line final answer
5. UI shows animated typing bubble, then displays the response

---

🧩 Technologies Used
Python
Flask
Requests (API calls)
HTML / CSS / JavaScript
Wikipedia API
DuckDuckGo API
