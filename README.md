# MERN Stack E-Commerce Project

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Product Endpoints](#product-endpoints)
  - [Cart Endpoints](#cart-endpoints)
  - [Review Endpoints](#review-endpoints)
- [Middleware](#middleware)
- [Models](#models)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project is a full-fledged e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It allows users to browse products, add them to their cart, manage their wishlist, and leave reviews. The application includes user authentication and role-based access control for admin functionalities.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cloud Storage:** Cloudinary for image uploads
- **Middleware:** Custom middleware for role checking, user details retrieval, and review validation
- **Libraries:** Mongoose, Multer, etc.

## Features

- **User Authentication:** Users can register, log in, and manage their accounts.
- **Product Management:** Admins can create, read, update, and delete products.
- **Cart Functionality:** Users can add, update, and remove products from their cart.
- **Wishlist Management:** Users can add products to their wishlist and manage it.
- **Review System:** Users can leave reviews and ratings for products.
- **Advanced Filtering and Sorting:** Users can filter and sort products based on various criteria such as price, brand, and rating.

## Screenshots

Below are some screenshots of the application:

### 1. Homepage

![Homepage Screenshot](<./frontend/src/assets/Screenshots/Screenshot%20(41).png>)

### 2. Home - Sliders

![User Profile Page Screenshot](<./frontend/src/assets/Screenshots/Screenshot%20(42).png>)

### 3. Footer

![Post Details Page Screenshot](<./frontend/src/assets/Screenshots/Screenshot%20(43).png>)

### 4. Products Page

![Chat Page Screenshot](<./frontend/src/assets/Screenshots/Screenshot%20(44).png>)

### 5. About Page

![Search Page Screenshot](<./frontend/src/assets/Screenshots/Screenshot%20(45).png>)

### 5. Contact Page

![Search Page Screenshot](<./frontend/src/assets/Screenshots/Screenshot%20(46).png>)

### 5. FAQ Page

![Search Page Screenshot](<./frontend/src/assets/Screenshots/Screenshot%20(47).png>)

### 5. Sign Up Page

![Search Page Screenshot](<./frontend/src/assets/Screenshots/Screenshot%20(48).png>)

### 6. Cart Page

![Sign In Profile Page Screenshot](<./frontend/src/assets/Screenshots/Screenshot 2024-11-21 184703.png>)

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <https://github.com/anupamyadav01/MERN-Stack-eCommerce>
   ```

2. **Navigate to the backend directory:**

   ```bash
    cd backend
   ```

3. **Install dependencies:**

   ```bash
    npm install
   ```

## Set up environment variables:

Create a .env file in the root of the backend directory and add the necessary environment variables like -

- PORT=9000
- MONGODB_URI
- DB_NAME
- JWT_SECRET
- MAIL_PASSWORD
- MAIL_USERNAMECLOUDINARY_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- CLOUDINARY_URL

4. **Run the backend server:**

   ```bash
    npm run dev
   ```

5. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```
6. **Install dependencies:**

   ```bash
    npm install
   ```

7. **Run the frontend application:**

   ```bash
    npm run dev
   ```

## API Endpoints

### User Endpoints

POST `/api/users/register`

- Description: Register a new user.

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

- POST /`api/users/login` - Log in a user.

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

- GET `/api/users/profile`- Get user profile (requires authentication).

### Product Endpoints

- POST `/api/products/create-product` - Create a new product (admin only).

  ```json
  <!-- Request-  -->
  {
    "title": "Sample Product",
    "description": "This is a sample product.",
    "price": 99.99,
    "discountPercentage": 10,
    "rating": 4.5,
    "stock": 50,
    "brand": "Brand Name",
    "category": "Category Name",
    "thumbnail": "thumbnail_url",
    "productImage": "product_image_url"
  }

  <!-- Response - -->
  {
    "success": true,
    "message": "Product created successfully",
    "productTitle": "Sample Product"
  }

  ```

- GET `/api/products/get-all-products` - Retrieve all products.

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "products": [
    {
      "_id": "PRODUCT_ID",
      "title": "Sample Product",
      "price": 99.99
    }
    {
      "_id": "PRODUCT_ID",
      "title": "Sample Product",
      "price": 99.99
    }
    {
      "_id": "PRODUCT_ID",
      "title": "Sample Product",
      "price": 99.99
    }
    {
      "_id": "PRODUCT_ID",
      "title": "Sample Product",
      "price": 99.99
    }
  ]
}
```

- GET `/api/products/:productId` - Get product details by ID.
- DELETE `/api/products/delete/:productId` - Delete a product (admin only).
- POST `/api/products/review/:productId` - Add a review to a product.
- GET `/api/products/review/:productId `- Get reviews for a product.
- POST `/api/products/rating/:productId` - Rate a product.
- GET `/api/products/addToWishlist/:productId` - Add or remove product from wishlist.

### Cart Endpoints

- POST `/api/cart/add-to-cart` - Add a product to the cart.
  Review Endpoints
- POST `/api/reviews/:productId` - Add a review for a product.
- GET `/api/reviews/:productId` - Get reviews by product ID.

## Project Structure

```├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ └── server.js
├── frontend
│ ├── public
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── redux
│ │ └── App.js
│ └── tailwind.config.js
├── README.md
└── package.json
```
