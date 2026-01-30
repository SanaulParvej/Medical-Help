// ========================================
// MEDICAL HELP - AUTH JAVASCRIPT
// ========================================

// Password Toggle Functionality
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// OTP Input Auto-Focus
const otpInputs = document.querySelectorAll('.otp-input');
if (otpInputs.length > 0) {
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            if (this.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '') {
                if (index > 0) {
                    otpInputs[index - 1].focus();
                }
            }
        });

        // Only allow numbers
        input.addEventListener('keypress', function(e) {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        console.log('Login attempt:', { email, password, remember });
        
        // TODO: Add your authentication logic here
        alert('লগইন ফাংশনালিটি শীঘ্রই যুক্ত করা হবে!');
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        
        if (password !== confirmPassword) {
            alert('পাসওয়ার্ড মিলছে না!');
            return;
        }
        
        if (!terms) {
            alert('অনুগ্রহ করে শর্তাবলী সম্মত হন!');
            return;
        }
        
        console.log('Signup attempt:', { fullname, email, phone, password });
        
        // TODO: Add your registration logic here
        alert('রেজিস্ট্রেশন ফাংশনালিটি শীঘ্রই যুক্ত করা হবে!');
    });
}

// Forgot Password Form Handler
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const otpVerificationForm = document.getElementById('otpVerificationForm');
const newPasswordForm = document.getElementById('newPasswordForm');

if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        console.log('Forgot password for:', email);
        
        // TODO: Add your OTP sending logic here
        
        // Show OTP form
        forgotPasswordForm.classList.add('hidden');
        otpVerificationForm.classList.remove('hidden');
        
        alert('OTP আপনার ইমেইলে পাঠানো হয়েছে!');
    });
}

if (otpVerificationForm) {
    otpVerificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const otpValues = Array.from(otpInputs).map(input => input.value).join('');
        console.log('OTP entered:', otpValues);
        
        // TODO: Add your OTP verification logic here
        
        if (otpValues.length === 6) {
            // Show new password form
            otpVerificationForm.classList.add('hidden');
            newPasswordForm.classList.remove('hidden');
            
            alert('OTP যাচাই সফল হয়েছে!');
        } else {
            alert('সম্পূর্ণ OTP লিখুন!');
        }
    });
}

if (newPasswordForm) {
    newPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        if (newPassword !== confirmNewPassword) {
            alert('পাসওয়ার্ড মিলছে না!');
            return;
        }
        
        console.log('New password set');
        
        // TODO: Add your password reset logic here
        
        alert('পাসওয়ার্ড সফলভাবে রিসেট হয়েছে!');
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}

// Resend OTP Handler
const resendLink = document.querySelector('.resend-link');
if (resendLink) {
    resendLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // TODO: Add your OTP resend logic here
        alert('নতুন OTP পাঠানো হয়েছে!');
    });
}

// Social Login Handlers
document.querySelectorAll('.btn-social').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        console.log(`${provider} login clicked`);
        
        // TODO: Add your social authentication logic here
        alert(`${provider} লগইন শীঘ্রই যুক্ত করা হবে!`);
    });
});

// Floating Chat Button Handler
const floatingChat = document.querySelector('.floating-chat');
if (floatingChat) {
    floatingChat.addEventListener('click', function() {
        // TODO: Add your chat functionality here
        alert('চ্যাট সাপোর্ট শীঘ্রই আসছে!');
    });
}

// Phone Number Formatting (Bangladesh)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        // Ensure it starts with 01
        if (value.length > 0 && !value.startsWith('01')) {
            value = '01' + value;
        }
        
        // Limit to 11 digits
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        this.value = value;
    });
}

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^01[0-9]{9}$/;
    return re.test(phone);
}

// Add input validation feedback
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = 'var(--red)';
        } else {
            this.style.borderColor = '';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = 'var(--red)';
        } else {
            this.style.borderColor = '';
        }
    });
});

// Menu Button Handler
const menuBtn = document.querySelector('.menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        // TODO: Add your menu functionality here
        alert('মেনু শীঘ্রই যুক্ত করা হবে!');
    });
}

console.log('Medical Help Auth System Loaded ✓');
