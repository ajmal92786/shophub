# ShopHub 🛒

ShopHub is a **full‑stack e‑commerce web application** designed to deliver a smooth and modern online shopping experience. The application covers core e‑commerce workflows such as product browsing, advanced filtering, search, cart and wishlist management, address handling, and order placement.

Built with a **React frontend**, **Node.js/Express backend**, and **MongoDB database**, ShopHub demonstrates clean frontend–backend integration and real‑world product flows.

---

## 🌐 Live Demo

🔗 **Live App:** [https://shophub-app-eac27.vercel.app/](https://shophub-app-eac27.vercel.app/)

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ajmalbly27/shophub.git
cd shophub
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGODB=your_database_connection_string
```

Start the backend server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

#### Environment Variables

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend server:

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🎥 Demo Video

A 5–7 minute walkthrough covering all major features:

🔗 [https://drive.google.com/file/d/1tsstIGfav5EpQYDfe6uc7FdqAiRkDCaw/view](https://drive.google.com/file/d/1tsstIGfav5EpQYDfe6uc7FdqAiRkDCaw/view)

---

## 🚀 Features

### 🏠 Home

- Product categories
- Search products by title or description

### 📦 Product Listing

- Category‑based product listing
- Advanced filtering and sorting

### 🔍 Product Details

- Detailed product information (price, rating, discount, sizes, etc.)
- Add to cart action

### 🛒 Cart

- Increase or decrease product quantity
- Price breakdown
- Move items to wishlist or remove from cart

### ❤️ Wishlist

- View saved products
- Move products to cart

### 👤 Profile

- User personal information
- Address management
- Order history

---

## 🛠 Tech Stack

### Frontend

- React
- JavaScript
- HTML, CSS
- Bootstrap

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB (Mongoose)

---

## 📁 Project Structure

```
ShopHub/
├── frontend/        # React frontend
├── backend/         # Node.js + Express backend
└── README.md
```

---

## 🔗 API Endpoints

### Products & Categories

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | /api/products       | Get all products   |
| GET    | /api/products/:id   | Get product by ID  |
| GET    | /api/categories     | Get all categories |
| GET    | /api/categories/:id | Get category by ID |

### Cart

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | /api/cart     | Get user cart items      |
| POST   | /api/cart     | Add product to cart      |
| POST   | /api/cart/:id | Update product quantity  |
| DELETE | /api/cart/:id | Remove product from cart |

### Wishlist

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| GET    | /api/wishlist     | Get wishlist items           |
| POST   | /api/wishlist     | Add product to wishlist      |
| DELETE | /api/wishlist/:id | Remove product from wishlist |

### Address

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | /api/addresses     | Get user addresses |
| POST   | /api/addresses     | Add address        |
| POST   | /api/addresses/:id | Update address     |
| DELETE | /api/addresses/:id | Delete address     |

### Orders

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /api/orders     | Get user orders   |
| POST   | /api/orders     | Place order       |
| GET    | /api/orders/:id | Get order details |

---

## 📌 Example API Response

### Example: Get All Products

**Request**

```http
GET /api/products
```

**Response (200 OK)**

```json
[
  {
        "_id": "productId",
        "title": "Classic Cotton Men's T-Shirt",
        "price": 799,
        "discountPercentage": 10,
        "category": {
          "_id": "categoryId",
          "name": "Men",
          "thumbnail": "https://images.unsplash.com/example.photo",
        },
        "sizes": [ "M", "L", "XL" ],
        "rating": 4.3,
        "imageUrl": "https://images.unsplash.com/photo-example",
        "availableQuantity": 50,
        "descriptionPoints": [],
        "payOnDelivery": true,
        "freeDelivery": true,
        "securePayment": true,
      },
      "returnPolicy": {
          "returnable": true,
          "returnDays": 10
      },
]
```

#### Example: Get Product by ID

**Request**

```http
GET /api/products/:id
```

**Response (200 OK)**

Return a product details

#### Example: Get All Categories

**Request**

```http
GET /api/categories
```

**Response (200 OK)**

```json
[
  {
    "_id": "categoryId",
    "name": "Men",
    "thumbnail": "https://images.unsplash.com/photo-example"
  }
]
```

#### Example: Get Categoey by ID

**Request**

```http
GET /api/categories/:id
```

**Response (200 OK)**

Return a category details

#### **GET /api/cart**

Fetch all cart items of a user

Query Params:

- `userId`

Response:

```json
{
  "_id": "cartId,
  "userId": "userId,
  "items": [
    {
      "productId": "productId",
      "quantity": 1,
      "size": "L",
    }
  ],
}
```

---

## 🔄 Frontend–Backend Flow

- Frontend communicates with backend via REST APIs
- Backend handles routing, validation, and business logic
- JSON is used for data exchange

---

## Contact

For bugs or feature request, please reach out to:

📧 **[ajmalbly27@gmail.com](mailto:ajmalbly27@gmail.com)**
