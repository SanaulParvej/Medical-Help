// ========================================
// CONFIGURATION FILE
// ========================================

const config = {
    // Application
    app: {
        name: 'Medical Help',
        version: '1.0.0',
        description: 'Healthcare services platform',
        language: 'bengali'
    },

    // API Configuration
    api: {
        baseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api',
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    },

    // Authentication
    auth: {
        tokenKey: 'medicalhelp_token',
        refreshTokenKey: 'medicalhelp_refresh_token',
        tokenExpiry: 3600, // 1 hour in seconds
        refreshTokenExpiry: 604800 // 7 days in seconds
    },

    // Services
    services: {
        emergency: '999',
        support: '+880 1303-609706',
        email: 'support@medicalhelp.com'
    },

    // Routes
    routes: {
        home: '/mvc/views/index.html',
        login: '/mvc/views/login.html',
        signup: '/mvc/views/signup.html',
        dashboard: '/mvc/views/dashboard.html',
        profile: '/mvc/views/profile.html',
        appointments: '/mvc/views/appointments.html'
    },

    // Features
    features: {
        onlineConsultation: true,
        emergencyService: true,
        medicineDelivery: true,
        labTests: true,
        appointmentBooking: true
    },

    // Validation
    validation: {
        minPasswordLength: 6,
        maxPasswordLength: 128,
        phoneRegex: /^01[0-9]{9}$/,
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
};

export default config;
