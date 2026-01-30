# Medical Help - Healthcare Website

A professional medical website project providing healthcare services and information using **MVC Architecture**.

## Project Structure

```
Medical Help/
├── index.html              # Main homepage
├── mvc/                    # MVC Application Folder
│   ├── models/            # Data models
│   │   ├── User.js        # User model
│   │   └── Appointment.js # Appointment model
│   ├── views/             # HTML templates
│   │   ├── index.html     # Home page
│   │   ├── login.html     # Login page
│   │   ├── signup.html    # Registration page
│   │   ├── about.html     # About page
│   │   ├── services.html  # Services page
│   │   ├── contact.html   # Contact page
│   │   └── forgot-password.html # Password reset
│   ├── controllers/       # Business logic
│   │   ├── authController.js # Authentication
│   │   └── appointmentController.js # Appointments
│   ├── public/            # Static assets
│   │   ├── css/
│   │   │   ├── style.css # Main stylesheet
│   │   │   └── auth.css  # Auth pages style
│   │   ├── js/
│   │   │   ├── main.js   # Main JavaScript
│   │   │   └── auth.js   # Auth JavaScript
│   │   └── assets/
│   │       ├── images/
│   │       ├── icons/
│   │       └── videos/
│   ├── config/            # Configuration
│   │   └── config.js      # App settings
│   └── utils/             # Helper utilities
│       ├── helpers.js     # Helper functions
│       └── validators.js  # Validation functions
├── components/            # Reusable components
├── workflow.md            # Project workflow documentation
└── README.md              # This file
```

## Features

- ✅ Professional MVC architecture
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Complete authentication system (login, signup, password reset)
- ✅ Appointment booking system
- ✅ Bengali language support
- ✅ 24/7 emergency services
- ✅ Doctor directory
- ✅ Service showcase
- ✅ Form validation
- ✅ Clean, maintainable code

## MVC Architecture

### Models (mvc/models/)
- Define data structures
- Implement validation logic
- Handle data integrity

### Views (mvc/views/)
- HTML user interface
- Responsive design
- Form templates

### Controllers (mvc/controllers/)
- Handle business logic
- Process user requests
- Coordinate between models and views

## Getting Started

1. Open `index.html` in a web browser
2. Navigate to `mvc/views/login.html` for login
3. Navigate to `mvc/views/signup.html` for registration
4. Check `mvc/controllers/` for business logic
5. Review `mvc/models/` for data structures

## File References

### From Root:
```html
<link rel="stylesheet" href="./mvc/public/css/style.css">
<script src="./mvc/public/js/main.js"></script>
<a href="./mvc/views/login.html">Login</a>
```

### From mvc/views/:
```html
<link rel="stylesheet" href="../public/css/style.css">
<script src="../public/js/main.js"></script>
<a href="login.html">Login</a>
```

## Technologies Used

- HTML5 - Structure
- CSS3 - Styling with responsive design
- JavaScript (ES6+) - Client-side logic
- MVC Architecture - Design pattern
- Font Awesome Icons - Icon library

## Modules & Functions

### Authentication (authController.js)
- `login()` - User login
- `signup()` - User registration
- `forgotPassword()` - Password recovery
- `logout()` - User logout

### Appointments (appointmentController.js)
- `createAppointment()` - Book appointment
- `getUserAppointments()` - View appointments
- `cancelAppointment()` - Cancel appointment
- `rescheduleAppointment()` - Reschedule appointment

### Validators (validators.js)
- `isValidEmail()` - Email validation
- `isValidPhone()` - Phone validation
- `validatePassword()` - Password strength check
- `isValidDate()` - Date validation

### Helpers (helpers.js)
- `formatDate()` - Date formatting
- `formatTime()` - Time formatting
- `showNotification()` - Display notifications
- `generateId()` - Generate unique IDs

## Contact Information

- **Emergency**: 999
- **Support**: +880 1303-609706
- **Email**: support@medicalhelp.com
- **Hours**: 24/7

## License

© 2026 Medical Help. All rights reserved.
