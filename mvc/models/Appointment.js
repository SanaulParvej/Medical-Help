// ========================================
// APPOINTMENT MODEL - Appointment Data
// ========================================

class Appointment {
    constructor(id, userId, doctorId, date, time, reason, status = 'pending') {
        this.id = id;
        this.userId = userId;
        this.doctorId = doctorId;
        this.date = date;
        this.time = time;
        this.reason = reason;
        this.status = status; // pending, confirmed, completed, cancelled
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * Validate appointment data
     * @returns {Object} Validation result
     */
    validate() {
        const errors = [];

        if (!this.userId) errors.push('User ID is required');
        if (!this.doctorId) errors.push('Doctor ID is required');
        if (!this.date) errors.push('Date is required');
        if (!this.time) errors.push('Time is required');
        if (!this.reason || this.reason.trim() === '') {
            errors.push('Reason for appointment is required');
        }

        // Validate date is in future
        const appointmentDate = new Date(`${this.date} ${this.time}`);
        if (appointmentDate <= new Date()) {
            errors.push('Appointment date must be in the future');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Cancel appointment
     */
    cancel() {
        this.status = 'cancelled';
        this.updatedAt = new Date();
    }

    /**
     * Confirm appointment
     */
    confirm() {
        this.status = 'confirmed';
        this.updatedAt = new Date();
    }

    /**
     * Mark as completed
     */
    complete() {
        this.status = 'completed';
        this.updatedAt = new Date();
    }

    /**
     * Get appointment as JSON
     * @returns {Object} Appointment data
     */
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            doctorId: this.doctorId,
            date: this.date,
            time: this.time,
            reason: this.reason,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export default Appointment;
