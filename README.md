
Creating README.md now with all setup instructions and API documentation.

```markdown
# My Contacts Backend API

A Node.js REST API for managing user contacts with JWT authentication. Built with Express, MongoDB, and Mongoose.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (Atlas cloud or local instance)
- **Postman** or **cURL** (for testing API endpoints)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd small-node-projcet
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5001
CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>?appName=<app-name>
ACCESS_TOKEN_SECRET=your-secret-key-here
TOKEN_EXPIRES_IN=60m
```

### Environment Variables Explanation:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5001` |
| `CONNECTION_STRING` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `ACCESS_TOKEN_SECRET` | Secret key for JWT tokens | `SAIGANESH_SECRET_KEY` |
| `TOKEN_EXPIRES_IN` | JWT token expiration time | `60m` |

**Note:** Keep your .env file secure and never commit it to version control.

## Running the Application

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5001` (or your configured PORT)

You should see:
```
MongoDB connected: <host>, <database-name>
server running on port 5001
```

## API Endpoints

### Base URL
```
http://localhost:5001/api
```

---

## User Endpoints

### 1. Register User
- **Method:** `POST`
- **Endpoint:** `/users/register`
- **Access:** Public
- **Description:** Create a new user account

**Request Body:**
```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com"
}
```

**Error Response (400):**
```json
{
  "title": "Bad Request",
  "message": "User already registered",
  "stackTrace": "..."
}
```

---

### 2. Login User
- **Method:** `POST`
- **Endpoint:** `/users/login`
- **Access:** Public
- **Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "title": "Unauthorized",
  "message": "Invalid email or password",
  "stackTrace": "..."
}
```

---

### 3. Get Current User
- **Method:** `GET`
- **Endpoint:** `/users/current`
- **Access:** Private (Requires Bearer Token)
- **Description:** Retrieve logged-in user information

**Headers Required:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "id": "507f1f77bcf86cd799439011"
}
```

---

## Contact Endpoints

**All contact endpoints require authentication. Include the Bearer token in Authorization header.**

### 4. Get All Contacts
- **Method:** `GET`
- **Endpoint:** `/contacts`
- **Access:** Private
- **Description:** Retrieve all contacts for the logged-in user

**Headers Required:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "1234567890",
    "user_id": "507f1f77bcf86cd799439011",
    "createdAt": "2024-04-23T10:30:00.000Z",
    "updatedAt": "2024-04-23T10:30:00.000Z"
  }
]
```

---

### 5. Create Contact
- **Method:** `POST`
- **Endpoint:** `/contacts`
- **Access:** Private
- **Description:** Create a new contact

**Headers Required:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "1234567890"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "1234567890",
  "user_id": "507f1f77bcf86cd799439011",
  "createdAt": "2024-04-23T10:30:00.000Z",
  "updatedAt": "2024-04-23T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "title": "Bad Request",
  "message": "All fields (name, email, phone) are required",
  "stackTrace": "..."
}
```

---

### 6. Get Single Contact
- **Method:** `GET`
- **Endpoint:** `/contacts/:id`
- **Access:** Private
- **Description:** Retrieve a specific contact by ID

**Headers Required:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "1234567890",
  "user_id": "507f1f77bcf86cd799439011",
  "createdAt": "2024-04-23T10:30:00.000Z",
  "updatedAt": "2024-04-23T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "title": "Not found",
  "message": "Contact Not found",
  "stackTrace": "..."
}
```

---

### 7. Update Contact
- **Method:** `PUT`
- **Endpoint:** `/contacts/:id`
- **Access:** Private
- **Description:** Update an existing contact

**Headers Required:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alice Smith",
  "email": "alice.smith@example.com",
  "phone": "9876543210"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Alice Smith",
  "email": "alice.smith@example.com",
  "phone": "9876543210",
  "user_id": "507f1f77bcf86cd799439011",
  "createdAt": "2024-04-23T10:30:00.000Z",
  "updatedAt": "2024-04-23T10:35:00.000Z"
}
```

---

### 8. Delete Contact
- **Method:** `DELETE`
- **Endpoint:** `/contacts/:id`
- **Access:** Private
- **Description:** Delete a contact

**Headers Required:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "message": "Delete contact 507f1f77bcf86cd799439012"
}
```

**Error Response (404):**
```json
{
  "title": "Not found",
  "message": "Contact Not found",
  "stackTrace": "..."
}
```

---

## Authentication

### How to Get a Bearer Token

1. **Register a new user** (if you don't have an account):
   ```bash
   POST /api/users/register
   ```

2. **Login to get token:**
   ```bash
   POST /api/users/login
   ```
   Response includes `accessToken`

3. **Use token in requests:**
   Add this header to all private endpoints:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Token Expiration
- Tokens expire after `60m` (configurable via `TOKEN_EXPIRES_IN` in .env)
- You need to login again to get a new token

---

## Example Usage with cURL

### Register User:
```bash
curl -X POST http://localhost:5001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"userName":"john","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Contacts:
```bash
curl -X GET http://localhost:5001/api/contacts \
  -H "Authorization: Bearer <your_token_here>"
```

### Create Contact:
```bash
curl -X POST http://localhost:5001/api/contacts \
  -H "Authorization: Bearer <your_token_here>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","phone":"1234567890"}'
```

---

## Project Structure

```
small-node-projcet/
├── config/
│   └── dbconnection.js          # MongoDB connection
├── controllers/
│   ├── userController.js        # User endpoints logic
│   └── contactController.js     # Contact endpoints logic
├── models/
│   ├── userModel.js             # User schema
│   └── contactModel.js          # Contact schema
├── middleware/
│   ├── errorHandler.js          # Global error handling
│   └── validateTokenHandler.js  # JWT authentication
├── routes/
│   ├── userRoute.js             # User routes
│   └── contactRoute.js          # Contact routes
├── constants.js                 # Status code constants
├── server.js                    # Main server file
├── package.json                 # Dependencies
└── .env                         # Environment variables (keep secret!)
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Troubleshooting

**Issue:** "Cannot connect to MongoDB"
- Check `CONNECTION_STRING` in .env
- Verify MongoDB Atlas is running
- Check network access in MongoDB Atlas security settings

**Issue:** "Unauthorized, No token"
- Ensure `Authorization` header is included
- Verify token format: `Bearer <token>`

**Issue:** "User already registered"
- Use a different email for registration
- Or use login if account already exists

**Issue:** "Contact Not found"
- Verify the contact ID is correct
- Ensure you're using a valid MongoDB ObjectId

---

## Author
- **saiganesh**

## License
ISC

---

**Happy coding! 🚀**
```

Now I'll create the README.md file in your project: Now I'll create the README.md file in your project: I don't have file creation tools available in Ask mode. Here's the complete README.md content you can create:

1. **Create a new file** named `README.md` in your project root directory (d:\node-learning\small-node-projcet\)

2. **Copy and paste this content** into the file:

```markdown
# My Contacts Backend API

A Node.js REST API for managing user contacts with JWT authentication. Built with Express, MongoDB, and Mongoose.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (Atlas cloud or local instance)
- **Postman** or **cURL** (for testing API endpoints)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd small-node-projcet
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5001
CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>?appName=<app-name>
ACCESS_TOKEN_SECRET=your-secret-key-here
TOKEN_EXPIRES_IN=60m
```

### Environment Variables Explanation:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5001` |
| `CONNECTION_STRING` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `ACCESS_TOKEN_SECRET` | Secret key for JWT tokens | `SAIGANESH_SECRET_KEY` |
| `TOKEN_EXPIRES_IN` | JWT token expiration time | `60m` |

**Note:** Keep your .env file secure and never commit it to version control.

## Running the Application

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5001` (or your configured PORT)

You should see:
```
MongoDB connected: <host>, <database-name>
server running on port 5001
```

## API Endpoints

### Base URL
```
http://localhost:5001/api
```

---

## User Endpoints

### 1. Register User
- **Method:** `POST`
- **Endpoint:** `/users/register`
- **Access:** Public
- **Description:** Create a new user account

**Request Body:**
```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com"
}
```

**Error Response (400):**
```json
{
  "title": "Bad Request",
  "message": "User already registered",
  "stackTrace": "..."
}
```

---

### 2. Login User
- **Method:** `POST`
- **Endpoint:** `/users/login`
- **Access:** Public
- **Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "title": "Unauthorized",
  "message": "Invalid email or password",
  "stackTrace": "..."
}
```

---

### 3. Get Current User
- **Method:** `GET`
- **Endpoint:** `/users/current`
- **Access:** Private (Requires Bearer Token)
- **Description:** Retrieve logged-in user information

**Headers Required:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "userName": "john_doe",
  "email": "john@example.com",
  "id": "507f1f77bcf86cd799439011"
}
```

---

## Contact Endpoints

**All contact endpoints require authentication. Include the Bearer token in Authorization header.**

### 4. Get All Contacts
- **Method:** `GET`
- **Endpoint:** `/contacts`
- **Access:** Private
- **Description:** Retrieve all contacts for the logged-in user

**Headers Required:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "1234567890",
    "user_id": "507f1f77bcf86cd799439011",
    "createdAt": "2024-04-23T10:30:00.000Z",
    "updatedAt": "2024-04-23T10:30:00.000Z"
  }
]
```

---

### 5. Create Contact
- **Method:** `POST`
- **Endpoint:** `/contacts`
- **Access:** Private
- **Description:** Create a new contact

**Headers Required:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "1234567890"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "1234567890",
  "user_id": "507f1f77bcf86cd799439011",
  "createdAt": "2024-04-23T10:30:00.000Z",
  "updatedAt": "2024-04-23T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "title": "Bad Request",
  "message": "All fields (name, email, phone) are required",
  "stackTrace": "..."
}
```

---

### 6. Get Single Contact
- **Method:** `GET`
- **Endpoint:** `/contacts/:id`
- **Access:** Private
- **Description:** Retrieve a specific contact by ID

**Headers Required:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "phone": "1234567890",
  "user_id": "507f1f77bcf86cd799439011",
  "createdAt": "2024-04-23T10:30:00.000Z",
  "updatedAt": "2024-04-23T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "title": "Not found",
  "message": "Contact Not found",
  "stackTrace": "..."
}
```

---

### 7. Update Contact
- **Method:** `PUT`
- **Endpoint:** `/contacts/:id`
- **Access:** Private
- **Description:** Update an existing contact

**Headers Required:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Alice Smith",
  "email": "alice.smith@example.com",
  "phone": "9876543210"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Alice Smith",
  "email": "alice.smith@example.com",
  "phone": "9876543210",
  "user_id": "507f1f77bcf86cd799439011",
  "createdAt": "2024-04-23T10:30:00.000Z",
  "updatedAt": "2024-04-23T10:35:00.000Z"
}
```

---

### 8. Delete Contact
- **Method:** `DELETE`
- **Endpoint:** `/contacts/:id`
- **Access:** Private
- **Description:** Delete a contact

**Headers Required:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "message": "Delete contact 507f1f77bcf86cd799439012"
}
```

**Error Response (404):**
```json
{
  "title": "Not found",
  "message": "Contact Not found",
  "stackTrace": "..."
}
```

---

## Authentication

### How to Get a Bearer Token

1. **Register a new user** (if you don't have an account):
   ```bash
   POST /api/users/register
   ```

2. **Login to get token:**
   ```bash
   POST /api/users/login
   ```
   Response includes `accessToken`

3. **Use token in requests:**
   Add this header to all private endpoints:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Token Expiration
- Tokens expire after `60m` (configurable via `TOKEN_EXPIRES_IN` in .env)
- You need to login again to get a new token

---

## Example Usage with cURL

### Register User:
```bash
curl -X POST http://localhost:5001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"userName":"john","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Contacts:
```bash
curl -X GET http://localhost:5001/api/contacts \
  -H "Authorization: Bearer <your_token_here>"
```

### Create Contact:
```bash
curl -X POST http://localhost:5001/api/contacts \
  -H "Authorization: Bearer <your_token_here>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","phone":"1234567890"}'
```

---

## Project Structure

```
small-node-projcet/
├── config/
│   └── dbconnection.js          # MongoDB connection
├── controllers/
│   ├── userController.js        # User endpoints logic
│   └── contactController.js     # Contact endpoints logic
├── models/
│   ├── userModel.js             # User schema
│   └── contactModel.js          # Contact schema
├── middleware/
│   ├── errorHandler.js          # Global error handling
│   └── validateTokenHandler.js  # JWT authentication
├── routes/
│   ├── userRoute.js             # User routes
│   └── contactRoute.js          # Contact routes
├── constants.js                 # Status code constants
├── server.js                    # Main server file
├── package.json                 # Dependencies
└── .env                         # Environment variables (keep secret!)
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Troubleshooting

**Issue:** "Cannot connect to MongoDB"
- Check `CONNECTION_STRING` in .env
- Verify MongoDB Atlas is running
- Check network access in MongoDB Atlas security settings

**Issue:** "Unauthorized, No token"
- Ensure `Authorization` header is included
- Verify token format: `Bearer <token>`

**Issue:** "User already registered"
- Use a different email for registration
- Or use login if account already exists

**Issue:** "Contact Not found"
- Verify the contact ID is correct
- Ensure you're using a valid MongoDB ObjectId

---

## Author
- **saiganesh**

## License
ISC

---

**Happy coding! 🚀**
```

Save this as `README.md` in your project root directory. It includes:

✅ **Setup & Installation** - Prerequisites, installation steps, environment variables  
✅ **Running Instructions** - Both dev and production modes  
✅ **All 8 API Endpoints** - Complete documentation with request/response examples  
✅ **Authentication Guide** - How to register, login, and use tokens  
✅ **cURL Examples** - For testing without Postman  
✅ **Troubleshooting** - Common issues and solutionsSave this as `README.md` in your project root directory. It includes:

✅ **Setup & Installation** - Prerequisites, installation steps, environment variables  
✅ **Running Instructions** - Both dev and production modes  
✅ **All 8 API Endpoints** - Complete documentation with request/response examples  
✅ **Authentication Guide** - How to register, login, and use tokens  
✅ **cURL Examples** - For testing without Postman  
✅ **Troubleshooting** - Common issues and solutions