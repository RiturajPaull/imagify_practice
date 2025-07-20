# Imagify 🖼️✨

**Imagify** is a web application that lets users generate AI-powered images from any text input using [ClipDrop AI](https://clipdrop.co/). Each user starts with **5 free credits**, and can purchase more via **Razorpay** when credits run out.

---

## 🚀 Features

- 🔤 Generate images from text prompts using ClipDrop AI
- 🧑‍💻 User authentication (login/signup)
- 🎟️ Free 5 image generation credits per user
- 💳 Razorpay integration for purchasing additional credits
- 💡 Built with modern MERN stack and TailwindCSS for a sleek UI

---

## 🛠 Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Gateway**: Razorpay
- **AI API**: ClipDrop AI (Image generation)

---

## ⚙️ Setup Instructions

Follow these steps to run Imagify locally:

### 1. Clone the repository

```bash
git clone https://github.com/RiturajPaull/imagify_practice.git
cd imagify_practice
```
### 2.  Setup Backend
```bash
cd backend
npm install
```
### 3.  Create a .env file in the backend folder and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIPDROP_API_KEY=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
### 3. Start the backend server:
```bash
npm start
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```
### 3. Add a .env file in the frontend folder:
```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```
### 3. Start the frontend:
```bash
npm start
```

---

###👤 Author
- Made with ❤️ by Rituraj Paul
