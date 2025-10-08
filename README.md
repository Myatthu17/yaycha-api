
---
# ⚙️ Yaycha API — Backend for Yaycha

**Yaycha API** is the backend service that powers the **[Yaycha](https://github.com/Myatthu17/yaycha)** social media platform.  
It handles all the core functionalities — authentication, posts, comments, likes, follows, and user management — built using **Node.js**, **Express**, and **Prisma ORM**.

---

## 🚀 Features

- 🔐 Secure user authentication (JWT)  
- 🧍 User registration and profile management  
- 📝 Post creation and retrieval  
- 💬 Comment system  
- ❤️ Like and unlike posts/comments  
- ➕ Follow and unfollow users  
- 🕒 Show latest posts  
- 👥 Show posts from followed users  

---

## 🛠️ Tech Stack

- 🚀 **Node.js + Express** — for scalable backend development  
- 🧱 **Prisma ORM** — for database management  
- 🔐 **JWT (jsonwebtoken)** — for authentication  
- 🧂 **bcrypt** — for password encryption  
- 🌱 **@faker-js/faker** — for test and seed data  
- ⚙️ **dotenv** — for environment configuration  
- 🔁 **nodemon** — for hot reload during development  

---

## 💡 Overview

Yaycha API serves as the heart of the Yaycha platform, managing user data, interactions, and authentication with a robust and efficient backend architecture.  
It integrates seamlessly with the Yaycha frontend for a full social media experience.

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/Myatthu17/yaycha-api.git
cd yaycha-api
npm install
```

Create a .env file with the following variables:

```ini
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key_here"
```

Then run the commands below to initialize the database:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

and then run the server:
```bash
npx nodemon index.js
```
Server will run on 👉 http://localhost:5000

🙌 Credits

Sayar Ei Maung — for the Rock Star Developer 2025 book
me — for developing and completing the Yaycha backend 💪

