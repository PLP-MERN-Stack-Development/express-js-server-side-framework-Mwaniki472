# 🛒 Product API (Express.js + MongoDB)

This is a simple **RESTful API** built using **Node.js**, **Express.js**, and **MongoDB** for managing product data.  
It supports CRUD operations and includes middleware for logging, authentication, and error handling.

---

## 🚀 Features

- Full CRUD (Create, Read, Update, Delete) for products
- MongoDB for persistent storage
- Middleware for:
  - Request logging
  - API key authentication
  - Centralized error handling
- `.env` configuration support
- Pagination, filtering, and search

---

## 📁 Project Structure

project-folder/
├── middleware/
│ ├── auth.js
│ ├── errorHandler.js
│ └── logger.js
├── models/
│ └── Product.js
├── routes/
│ └── productRoutes.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md



---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

- [Node.js](https://nodejs.org/en/) installed
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or a local MongoDB instance

---

### 2️⃣ Install Dependencies


npm install
3️⃣ Configure Environment Variables
Create a file named .env in the project root:

env

PORT=3000
MONGO_URI=mongo db connection string
API_KEY=your secret key
🔒 Never share your .env file or push it to GitHub.
Add it to .gitignore.

4️⃣ Start the Server

node server.js

dotenv] injecting env (3) from .env
Connected to MongoDB ✅
Server is running on http://localhost:3000
🧠 API Routes
Method	Endpoint	Description
GET	/api/products	Retrieve all products
GET	/api/products/:id	Retrieve a single product
POST	/api/products	Add a new product
PUT	/api/products/:id	Update a product
DELETE	/api/products/:id	Delete a product

🔐 Authentication
All routes require an API key header:

Header	Example
x-api-key	secretkey123

If the API key is missing or incorrect, the server returns:


{ "error": "Unauthorized - missing/invalid API key" }
🧪 Example POST Request
URL:


POST http://localhost:3000/api/products
Headers:


x-api-key: secretkey123
Content-Type: application/json
Body:


{
  "name": "Wireless Mouse",
  "description": "Ergonomic design, rechargeable battery",
  "price": 35,
  "category": "electronics",
  "inStock": true
}
Response:

{
  "_id": "60af8f9c5b8c3a001f7d9b88",
  "name": "Wireless Mouse",
  "description": "Ergonomic design, rechargeable battery",
  "price": 35,
  "category": "electronics",
  "inStock": true,
  "__v": 0
}
🧰 Tech Stack
Backend: Node.js + Express.js

Database: MongoDB (via Mongoose)

Auth: Custom API Key Middleware

Environment Management: dotenv

Testing: Postman

🧹 Notes
Ensure your MongoDB URI is correct and accessible.













