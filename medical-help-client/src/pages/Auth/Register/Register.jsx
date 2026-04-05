import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const Register = () => {
    const { userSignUp, updateUser } = use(AuthContext);
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const from = '/';

    const validateForm = ({ name, email, password, confirmPassword }) => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required.';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters.';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            newErrors.password = 'Password must include uppercase, lowercase and a number.';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required.';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        return newErrors;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setAuthError('');
        setSuccessMessage('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        const validationErrors = validateForm({ name, email, password, confirmPassword });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        userSignUp(email, password)
            .then((result) => {
                console.log(result.user);

                return updateUser(name)
                    .then(() => {
                        const savedUser = {
                            name,
                            email,
                            role: 'user'
                        };

                        return fetch('http://localhost:4000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savedUser)
                        }).then((res) => res.json());
                    })
                    .then((data) => {
                        if (data.insertedId || data.message === 'User already exists') {
                            Swal.fire({
                                title: 'Registered Successfully!',
                                icon: 'success',
                                draggable: true
                            });
                        }

                        setErrors({});
                        setSuccessMessage('Account created successfully.');
                        form.reset();
                        navigate(from);
                    });
            })
            .catch((error) => {
                setAuthError(error.message);
            });
    };

    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-md">
                <div className="card bg-base-100 w-full shadow-2xl">
                    <div className="card-body p-8 lg:p-10 xl:p-12">
                        <h1 className="text-3xl font-bold text-black mb-4 text-center">Create an Account</h1>

                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset space-y-1">
                                <div>
                                    <label className="label text-black">Name</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaUser />
                                        </span>
                                        <input
                                            name="name"
                                            type="text"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="Full Name"
                                            required
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="label text-black">Email</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaEnvelope />
                                        </span>
                                        <input
                                            name="email"
                                            type="email"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="label text-black">Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaLock />
                                        </span>
                                        <input
                                            name="password"
                                            type="password"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="Password"
                                            required
                                        />
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="label text-black">Confirm Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaLock />
                                        </span>
                                        <input
                                            name="confirmPassword"
                                            type="password"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                </div>

                                <div className="text-right">
                                    <a className="link link-hover text-sm text-black">Forgot password?</a>
                                </div>
                                {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
                                <button type="submit" className="btn btn-neutral w-full">Register</button>
                            </fieldset>

                            {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}

                            <p className="mt-1 text-center text-black"><small>Already have an account? <Link className="btn-link" to="/auth/login">Login</Link></small></p>
                        </form>

                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
