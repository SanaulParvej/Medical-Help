import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase/firebase.init';


const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const user = { name, email, password };

        console.log(user);

        if (!email || !password) {
            setErrorMessage('Please fill email and password.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setSuccessMessage('Registration successful.');
                form.reset();
                navigate('/auth/login');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }

    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-md">
                <div className="card bg-base-100 w-full shadow-2xl">
                    <div className="card-body p-8 lg:p-10 xl:p-12">
                        <h1 className="text-3xl font-bold text-black mb-4 text-center">Create an Account</h1>

                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset space-y-1">

                                {/* Name */}
                                <div>
                                    <label className="label text-black">Name</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaUser />
                                        </span>
                                        <input
                                            name='name'
                                            type="text"
                                            className="input input-bordered w-full pl-10" // Added pl-10 for icon padding
                                            placeholder="Full Name"

                                        />
                                    </div>

                                </div>


                                {/* Email */}
                                <div>
                                    <label className="label text-black">Email</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaEnvelope />
                                        </span>
                                        <input
                                            name='email'
                                            type="email"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="Email"

                                        />
                                    </div>

                                </div>

                                {/* Password */}
                                <div>
                                    <label className="label text-black">Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaLock />
                                        </span>
                                        <input
                                            name='password'
                                            type="password"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="Password"
                                        />
                                    </div>

                                </div>

                                <div className="text-right">
                                    <a className="link link-hover text-sm text-black">Forgot password?</a>
                                </div>
                                <button type="submit" className="btn btn-neutral w-full">Register</button>
                            </fieldset>
                            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                            {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}
                            <p className='mt-1 text-center text-black'><small>Already have an account? <Link className='btn-link' to={'/auth/login'}>Login</Link></small></p>
                        </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;