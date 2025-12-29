


# GhostWriter

**GhostWriter** is a modern, AI-powered full-stack web application that generates professional, structured blog posts in seconds. Built with a stunning "Glassmorphism" UI and interactive animations, it leverages Google's **Gemini AI** to act as your personal creative writing assistant.

> **Live Demo:** [Click here to view the project](https://abhijeet586.github.io/ghost-writer)


---

## ✨ Features

* **🤖 AI-Powered Generation:** Generates complete blog posts with a Catchy Title, Introduction, Main Points, and Conclusion using Google Gemini.
* **📱 Fully Responsive:** Optimized for both Desktop (expansive glass UI) and Mobile (stacked layout with touch support).
* **🎨 Interactive UI:** Features a dynamic "Shockwave" dot grid background that reacts to mouse and touch inputs.
* **✨ Markdown Support:** Automatically formats AI responses into clean, readable HTML using `react-markdown`.
* **📋 One-Click Copy:** Easily copy the generated blog content to your clipboard.
* **🔮 Glassmorphism Design:** Modern aesthetic with backdrop blurs, gradients, and glowing effects.

---

## 🛠️ Tech Stack

### **Frontend**

* **React (Vite):** Fast, modern UI library.
* **Tailwind CSS:** For styling and responsive design.
* **Framer Motion:** For smooth entrance animations and transitions.
* **GSAP:** Powers the high-performance background dot interaction.

### **Backend**

* **Node.js & Express.js:** Handles API requests and routing.
* **Google Gemini API:** The AI "brain" behind the text generation.
* **MongoDB:** Database connection (prepared for future scalability).
* **Cors:** Handles cross-origin resource sharing between Frontend and Backend.

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### **Prerequisites**

* Node.js installed.
* A MongoDB connection string (Atlas).
* A Google Gemini API Key.

### **1. Clone the Repository**

```bash
git clone https://github.com/abhijeet586/ghost-writer.git
cd ghost-writer

```

### **2. Backend Setup**

Navigate to the server directory (or root if combined):

```bash
# Install dependencies
npm install express mongoose cors dotenv @google/generative-ai

# Create a .env file
touch .env

```

**Add your environment variables to `.env`:**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key

```

**Start the Server:**

```bash
node server.js

```

### **3. Frontend Setup**

Open a new terminal and navigate to the frontend directory:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

```

---

##  API Reference

### **Generate Blog**

Generates a formatted blog post based on a user topic.

* **URL:** `/api/generate`
* **Method:** `POST`
* **Body:**
```json
{
  "topic": "The Future of AI in 2025"
}

```


* **Success Response:**
```json
{
  "success": true,
  "content": "# The Future of AI...\n\nIntroduction..."
}

```



---



## 📬 Contact

**Abhijeet Senapati** , GitHub: [@abhijeet586](https://github.com/abhijeet586)

* Email: senapatiabhijeet55@gmail.com

