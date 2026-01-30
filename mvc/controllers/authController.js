// ========================================
// AUTH CONTROLLER - Handle Authentication
// ========================================

class AuthController {
    /**
     * Handle user login
     * @param {Object} credentials - Email and password
     * @returns {Promise<Object>} User data or error
     */
    static async login(credentials) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const user = await response.json();
            localStorage.setItem('token', user.token);
            return user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    /**
     * Handle user registration
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} User data or error
     */
    static async signup(userData) {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    /**
     * Handle password reset request
     * @param {string} email - User email
     * @returns {Promise<Object>} Reset response
     */
    static async forgotPassword(email) {
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Password reset request failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    }

    /**
     * Handle logout
     */
    static logout() {
        localStorage.removeItem('token');
        window.location.href = '/mvc/views/login.html';
    }

    /**
     * Get current user
     * @returns {Object} Current user data
     */
    static getCurrentUser() {
        const token = localStorage.getItem('token');
        if (!token) return null;

        // Decode JWT or fetch user data
        return JSON.parse(atob(token.split('.')[1]));
    }
}

export default AuthController;
