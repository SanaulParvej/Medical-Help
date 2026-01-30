// ========================================
// APPOINTMENT CONTROLLER - Manage Appointments
// ========================================

import Appointment from '../models/Appointment.js';

class AppointmentController {
    /**
     * Create a new appointment
     * @param {Object} appointmentData - Appointment details
     * @returns {Promise<Object>} Created appointment
     */
    static async createAppointment(appointmentData) {
        try {
            const appointment = new Appointment(
                null,
                appointmentData.userId,
                appointmentData.doctorId,
                appointmentData.date,
                appointmentData.time,
                appointmentData.reason
            );

            const validation = appointment.validate();
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(appointment)
            });

            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }

            return await response.json();
        } catch (error) {
            console.error('Create appointment error:', error);
            throw error;
        }
    }

    /**
     * Get all user appointments
     * @param {string} userId - User ID
     * @returns {Promise<Array>} List of appointments
     */
    static async getUserAppointments(userId) {
        try {
            const response = await fetch(`/api/appointments/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }

            return await response.json();
        } catch (error) {
            console.error('Get appointments error:', error);
            throw error;
        }
    }

    /**
     * Cancel an appointment
     * @param {string} appointmentId - Appointment ID
     * @returns {Promise<Object>} Updated appointment
     */
    static async cancelAppointment(appointmentId) {
        try {
            const response = await fetch(`/api/appointments/${appointmentId}/cancel`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to cancel appointment');
            }

            return await response.json();
        } catch (error) {
            console.error('Cancel appointment error:', error);
            throw error;
        }
    }

    /**
     * Reschedule an appointment
     * @param {string} appointmentId - Appointment ID
     * @param {Object} newDateTime - New date and time
     * @returns {Promise<Object>} Updated appointment
     */
    static async rescheduleAppointment(appointmentId, newDateTime) {
        try {
            const response = await fetch(`/api/appointments/${appointmentId}/reschedule`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newDateTime)
            });

            if (!response.ok) {
                throw new Error('Failed to reschedule appointment');
            }

            return await response.json();
        } catch (error) {
            console.error('Reschedule appointment error:', error);
            throw error;
        }
    }
}

export default AppointmentController;
