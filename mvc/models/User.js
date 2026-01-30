// ========================================
// USER MODEL - User Data Structure
// ========================================

class User {
    constructor(id, fullname, email, phone, password, createdAt) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = new Date();
    }

    /**
     * Validate user email
     * @returns {boolean} Is email valid
     */
    isEmailValid() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    /**
     * Validate phone number (Bangladesh format)
     * @returns {boolean} Is phone valid
     */
    isPhoneValid() {
        const phoneRegex = /^01[0-9]{9}$/;
        return phoneRegex.test(this.phone);
    }

    /**
     * Validate password strength
     * @returns {boolean} Is password strong
     */
    isPasswordStrong() {
        return this.password && this.password.length >= 6;
    }

    /**
     * Get user as JSON
     * @returns {Object} User data
     */
    toJSON() {
        return {
            id: this.id,
            fullname: this.fullname,
            email: this.email,
            phone: this.phone,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    /**
     * Validate all user data
     * @returns {Object} Validation result
     */
    validate() {
        const errors = [];

        if (!this.fullname || this.fullname.trim() === '') {
            errors.push('Full name is required');
        }

        if (!this.isEmailValid()) {
            errors.push('Invalid email format');
        }

        if (!this.isPhoneValid()) {
            errors.push('Invalid phone number (use Bangladesh format)');
        }

        if (!this.isPasswordStrong()) {
            errors.push('Password must be at least 6 characters');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

export default User;
