// ========================================
// HELPER UTILITIES
// ========================================

const helpers = {
    /**
     * Format date to readable format
     * @param {Date} date - Date object
     * @returns {string} Formatted date
     */
    formatDate(date) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            language: 'bn-BD'
        };
        return new Date(date).toLocaleDateString('bn-BD', options);
    },

    /**
     * Format time to readable format
     * @param {Date} date - Date object
     * @returns {string} Formatted time
     */
    formatTime(date) {
        return new Date(date).toLocaleTimeString('bn-BD', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * Get greeting based on time
     * @returns {string} Greeting message
     */
    getGreeting() {
        const hour = new Date().getHours();
        
        if (hour < 12) return 'সকাল';
        else if (hour < 16) return 'দুপুর';
        else if (hour < 20) return 'সন্ধ্যা';
        else return 'রাত';
    },

    /**
     * Capitalize first letter
     * @param {string} str - String
     * @returns {string} Capitalized string
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Truncate text
     * @param {string} text - Text to truncate
     * @param {number} length - Max length
     * @returns {string} Truncated text
     */
    truncate(text, length = 100) {
        return text.length > length ? text.substring(0, length) + '...' : text;
    },

    /**
     * Generate unique ID
     * @returns {string} Unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Delay execution
     * @param {number} ms - Milliseconds
     * @returns {Promise}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Show notification
     * @param {string} message - Message
     * @param {string} type - Type (success, error, info, warning)
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${this.getColorByType(type)};
            color: white;
            border-radius: 5px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    /**
     * Get color by notification type
     * @param {string} type - Type
     * @returns {string} Color
     */
    getColorByType(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        return colors[type] || colors.info;
    },

    /**
     * Format phone number
     * @param {string} phone - Phone number
     * @returns {string} Formatted phone
     */
    formatPhone(phone) {
        return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
    },

    /**
     * Get initials from name
     * @param {string} name - Full name
     * @returns {string} Initials
     */
    getInitials(name) {
        return name.split(' ').map(part => part.charAt(0)).join('').toUpperCase();
    }
};

export default helpers;
