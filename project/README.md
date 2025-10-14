# Tiffin Track - Full Stack Application

A comprehensive food delivery application built with React frontend and Spring Boot backend, similar to Swiggy/Zomato but focused on home-style tiffin services.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Role-based Access**: Separate dashboards for vendors and customers
- **Real-time Updates**: Dynamic content updates

### Backend (Spring Boot)
- **RESTful APIs**: Well-structured API endpoints
- **JWT Authentication**: Secure user authentication
- **Role-based Security**: Different access levels for vendors and customers
- **MySQL Database**: Robust data persistence

### Key Functionalities
- **Vendor Features**: Add/manage tiffins, view bookings
- **Customer Features**: Browse tiffins, place bookings, free trials
- **Search & Filter**: Find tiffins by location, type, price
- **Booking Management**: Track orders and payments

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Context API for state management

### Backend
- Spring Boot 3.2
- Spring Security with JWT
- Spring Data JPA
- MySQL Database
- Maven for dependency management

## 📦 Project Structure

```
tiffin-track/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # Context providers
│   │   └── ...
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/tiffintrack/
│   │       ├── controller/  # REST controllers
│   │       ├── entity/      # JPA entities
│   │       ├── repository/  # Data repositories
│   │       ├── service/     # Business logic
│   │       └── security/    # Security configuration
│   └── src/main/resources/
└── database/               # Database schema
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- MySQL 8+
- Maven 3.6+

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Database Setup
1. Create MySQL database: `tiffin_db`
2. Update `backend/src/main/resources/application.properties` with your MySQL credentials
3. Run the provided SQL schema: `database/schema.sql`

## 🔐 Authentication

The application uses JWT-based authentication:
- **Registration**: Users can register as either VENDOR or CUSTOMER
- **Login**: Returns JWT token for API access
- **Protected Routes**: All API endpoints require valid JWT token

### Test Credentials
- **Vendor**: vendor@test.com / password
- **Customer**: customer@test.com / password

## 📱 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Vendor APIs
- `POST /api/vendor/tiffins` - Add new tiffin
- `GET /api/vendor/tiffins` - Get vendor's tiffins
- `DELETE /api/vendor/tiffins/{id}` - Delete tiffin
- `GET /api/vendor/bookings` - Get bookings for vendor

### Customer APIs
- `GET /api/customer/tiffins` - Browse all available tiffins
- `POST /api/customer/bookings` - Place new booking
- `GET /api/customer/bookings` - Get customer's bookings

## 🎨 UI Components

### Key Components
- **Splash Screen**: Animated logo with auto-redirect
- **Role Selection**: Choose between Vendor/Customer
- **Authentication**: Login/Register forms
- **Dashboards**: Role-specific interfaces
- **Tiffin Management**: CRUD operations for vendors
- **Booking System**: Order placement for customers

## 🔧 Configuration

### Frontend Environment
The frontend is configured to connect to the backend at `http://localhost:8080`

### Backend Configuration
Update `application.properties`:
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/tiffin_db
spring.datasource.username=root
spring.datasource.password=your_password

# JWT
jwt.secret=your_secret_key
jwt.expiration=86400000
```

## 🚀 Deployment

### Frontend
- Build: `npm run build`
- Deploy to Vercel, Netlify, or any static hosting service

### Backend
- Package: `mvn clean package`
- Deploy JAR file to any Java hosting service
- Ensure MySQL database is accessible

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@tiffintrack.com or create an issue in the repository.