# 🧠 AI Quizzer - Backend Microservice

This is a Dockerized backend microservice built for the **AI Quizzer** assessment task. It provides authentication, AI-generated quizzes, intelligent evaluation, retry history, and bonus AI features like hints and improvement suggestions via email. The service is deployed and hosted using Docker on Render.

---

## 🔗 Hosted API URL

> https://ai-quizzer-backend.onrender.com

---

## ✅ Core Features

- 🔐 JWT-based Authentication
- 🧠 AI-generated quizzes based on subject, grade & difficulty (via Groq)
- 📊 Quiz evaluation and scoring
- 🔁 Retry with tracking (`original` vs `retry`)
- 📈 Quiz history with filtering by grade, subject, and date

---

## ✨ Bonus Features

- 💡 AI-generated hints per question (via Groq)
- ✉️ Email results with AI improvement suggestions
- 🐳 Dockerized setup, deployed to Render

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB Atlas
- JWT Authentication
- Docker
- Groq LLMs (LLaMA 3)
- Nodemailer (Gmail SMTP)
- Render.com (for deployment)

---

## 📦 API Endpoints

### 🔐 Authentication
#### `POST /api/auth/login`
```json
{
  "username": "rahul",
  "password": "1234"
}
```

## 🧠 Quiz Creation

#### POST /api/quizzes
Headers: Authorization: Bearer {{token}}

```json
{
  "grade": 6,
  "subject": "Maths",
  "totalQuestions": 5,
  "maxScore": 5,
  "difficulty": "MEDIUM"
}
```

➡️ Returns a quiz with AI-generated questions.

---

## 📝 Submit a Quiz

#### POST /api/quizzes/:quizId/submit
Headers: Authorization + Content-Type: application/json

```json
{
  "email": "student@example.com",
  "answers": [
    {
      "questionId": "xxx",
      "selectedOption": "Option A"
    }
  ]
}
```

➡️ Returns score and sends email with AI suggestions.

----

## 🔁 Retry a Quiz
#### POST /api/quizzes/:quizId/retry

➡️ Same structure as submit.

---

## 📈 View Quiz History
#### GET /api/quizzes/history?grade=6&subject=Maths

Headers: Authorization

---

## 💡 Get AI-Powered Hints
#### GET /api/quizzes/:quizId/hints
Headers: Authorization

➡️ Returns each question with a 1-sentence hint.

---

## 🧪 Local Setup Instructions
#### 🔧 Prerequisites

- Node.js & npm

- MongoDB (or Atlas URI)

- Docker (optional if using only local run)

---

## ⚙️ Environment Variables

Create a .env file in the root:

```ini
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
GROQ_API_KEY=your_groq_api_key
```

---

## 🚀 Run Locally (No Docker)

```bash
npm install
npm run dev
```

---

## 🐳 Docker Setup

Build Image
```bash
docker build -t ai-quizzer-backend .
```

Run Container
```bash
docker run -p 5000:5000 --env-file .env ai-quizzer-backend
```

---

## 👤 Author
#### Rahul Mehta
GitHub: https://github.com/rahull0328