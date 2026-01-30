// ========================================
// VALIDATION UTILITIES
// ========================================

const validators = {
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} Is valid
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Validate phone number (Bangladesh format)
     * @param {string} phone - Phone number
     * @returns {boolean} Is valid
     */
    isValidPhone(phone) {
        const regex = /^01[0-9]{9}$/;
        return regex.test(phone);
    },

    /**
     * Validate password strength
     * @param {string} password - Password
     * @returns {Object} Validation result
     */
    validatePassword(password) {
        const errors = [];

        if (!password || password.length < 6) {
            errors.push('Password must be at least 6 characters');
        }

        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }

        return {
            isValid: errors.length === 0,
            errors: errors,
            strength: this.getPasswordStrength(password)
        };
    },

    /**
     * Get password strength level
     * @param {string} password - Password
     * @returns {string} Strength level
     */
    getPasswordStrength(password) {
        let strength = 'weak';
        
        if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
            strength = 'strong';
        } else if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            strength = 'medium';
        }

        return strength;
    },

    /**
     * Validate required field
     * @param {any} value - Value to check
     * @returns {boolean} Is not empty
     */
    isRequired(value) {
        return value !== null && value !== undefined && value !== '';
    },

    /**
     * Validate date format (YYYY-MM-DD)
     * @param {string} date - Date string
     * @returns {boolean} Is valid
     */
    isValidDate(date) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(date)) return false;
        
        const dateObj = new Date(date);
        return dateObj instanceof Date && !isNaN(dateObj);
    },

    /**
     * Validate time format (HH:MM)
     * @param {string} time - Time string
     * @returns {boolean} Is valid
     */
    isValidTime(time) {
        const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
    }
};

export default validators;
