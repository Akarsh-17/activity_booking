# activity_booking
A simple REST API for a basic activity booking application, allowing users to register, log in, view activities, and book them with conflict resolution using Node.js, Express, MongoDB, and JWT.

🔧Tech Stack
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Authentication: JWT-based Auth
Validation: Joi
Password Hashing: bcrypt

📂 Project Structure
├── config/             # MongoDB connection
├── controllers/        # Logic for each route
├── models/             # Mongoose schemas
├── routes/             # API endpoints
├── middleware/         # JWT and validation
├── validators/         # Joi schemas
├── server.js           # Entry point
└── .env                # Environment configuration

🚀 Features

👤 User Authentication

POST /api/user/signup – Register with name, email, phone, password

POST /api/user/loginUser – Login and receive a JWT

🎯 Activities

POST /api/activity/createActivity – Create new activity (title, description, location, date, time)

GET /api/activity/listActivities – Publicly accessible list of all activities no login required

📅 Bookings

POST /api/booking/createBooking – Book an activity (JWT required)
Detects and blocks conflicts if user has a booking at the same date/time
Pass confirm: true to update the previous booking

GET /api/booking/getUserBooking – Retrieve current user's bookings

✅ Validation

All request payloads are validated using Joi:
User registration & login
Activity creation
Booking creation (with optional conflict override)

📬 Sample Requests
Register
POST /api/user/signup
{
    "name": "akarsh",
    "email": "akarshynr@gmail.com",
    "phone": "1234567890",
    "password": "12345678"
}

LOGIN
POST /api/user/loginUser
{
    "email":"akarshynr@gmail.com",
    "password": "12345678"
}

CREATE ACTIVITY
POST /api/activity/createActivity
{
    "title":"football match",
    "description": "ind vs aus",
    "location": "delhi",
    "date": "2025-04-30", //YYYY-MM-DD
    "time": "19:00" //hh:mm
}

CREATE BOOKING
{
    "activityId":"681db890afef9feb0aee118f",
    "confirm": true // OPTIONAL
}


📫 Postman Collection

Import the provided Postman collection to test:

Authentication endpoints

Activity endpoints

Booking endpoints with token-based acces 
LINK : https://galactic-sunset-54058.postman.co/workspace/Study-Notion~0c25d401-6619-4d45-8e7f-5f769bba4f70/collection/27510228-a5f4ec47-855c-4ce0-83b6-ad7c797153dc?action=share&creator=27510228