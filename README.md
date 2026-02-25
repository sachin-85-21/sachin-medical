# 🏥 Sachin Medical - Online Pharmacy Platform

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform for online pharmacy services.

![Sachin Medical](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Node](https://img.shields.io/badge/Node-v18+-green)
![React](https://img.shields.io/badge/React-v18+-blue)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Customer Features
- 🔐 User Authentication (Register/Login/Logout)
- 🔍 Advanced Medicine Search with Filters
- 🛒 Shopping Cart Management
- 💳 Multiple Payment Options (COD, Razorpay)
- 📦 Order Tracking
- 📝 Prescription Upload
- 📱 Responsive Design
- 🏷️ Category-based Browsing
- 💰 Discount & Pricing

### Admin Features
- 📊 Dashboard with Analytics
- 💊 Medicine Management (CRUD)
- 📂 Category Management
- 📋 Order Management
- 👥 Customer Management
- 🔍 Search & Filter Medicines
- 📸 Image Upload (Cloudinary)
- 📈 Sales Statistics

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Library
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Toastify** - Notifications
- **React Icons** - Icons
- **Context API** - State Management

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password Hashing
- **Cloudinary** - Image Storage
- **Multer** - File Upload
- **Razorpay** - Payment Gateway

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/sachin-85-21/sachin-medical.git
cd sachin-medical
```

### Backend Setup
```bash
cd backend
npm install

# Create .env file (see Environment Variables section)
# Run seed data
npm run seed

# Start development server
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install

# Create .env file (see Environment Variables section)
# Start development server
npm run dev
```

## 🔐 Environment Variables

### Backend (.env)
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sachin_medical

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=your_email@gmail.com
ADMIN_PASSWORD=your_password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## 📁 Project Structure

```
sachin-medical/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── medicineController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── error.js
│   │   ├── upload.js
│   │   └── validation.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Medicine.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── medicineRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   └── seedData.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Table.jsx
│   │   │   ├── customer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Medicines.jsx
│   │   │   │   ├── EditMedicine.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   ├── Categories.jsx
│   │   │   │   └── Customers.jsx
│   │   │   ├── customer/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── MedicineListing.jsx
│   │   │   │   ├── MedicineDetail.jsx
│   │   │   │   ├── Cart.jsx
│   │   │   │   └── Checkout.jsx
│   │   │   └── info/
│   │   │       ├── About.jsx
│   │   │       ├── Contact.jsx
│   │   │       ├── FAQ.jsx
│   │   │       ├── Returns.jsx
│   │   │       ├── Privacy.jsx
│   │   │       ├── Terms.jsx
│   │   │       └── Cookies.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── categoryService.js
│   │   │   ├── medicineService.js
│   │   │   └── orderService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── LICENSE
```

## 📡 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Medicines
- `GET /api/medicines` - Get all medicines (with filters)
- `GET /api/medicines/:id` - Get single medicine
- `POST /api/medicines` - Create medicine (Admin)
- `PUT /api/medicines/:id` - Update medicine (Admin)
- `DELETE /api/medicines/:id` - Delete medicine (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Orders
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `POST /api/orders/:id/verify-payment` - Verify payment

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set Root Directory: `frontend`
4. Set Build Command: `npm run build`
5. Set Output Directory: `dist`
6. Add environment variables
7. Deploy

### Backend (Render/Railway)
1. Create new Web Service
2. Connect GitHub repository
3. Set Root Directory: `backend`
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add environment variables
7. Deploy

## 📸 Screenshots

### Customer Interface
- Home Page with Featured Medicines
- Medicine Listing with Filters
- Medicine Detail Page
- Shopping Cart
- Checkout Process

### Admin Panel
- Dashboard with Statistics
- Medicine Management
- Order Management
- Category Management

## 🔑 Default Credentials

### Admin Login
- Email: `admin@sachinmedical.com` (or as set in .env)
- Password: `Admin@123` (or as set in .env)

### Test User Login
- Email: `user@example.com`
- Password: `User@123`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Sachin Sahni**
- Email: sachinsahni702@gmail.com
- Phone: +91 85211 84035
- GitHub: [@sachin-85-21](https://github.com/sachin-85-21)

## 🙏 Acknowledgments

- Cloudinary for image hosting
- MongoDB Atlas for database hosting
- Razorpay for payment integration
- Tailwind CSS for styling framework
- React Icons for icon library

## 📞 Support

For support, email sachinsahni702@gmail.com or create an issue in the repository.

---

**Made with ❤️ by Sachin Sahni**
