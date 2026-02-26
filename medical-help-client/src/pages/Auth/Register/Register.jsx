import React from 'react';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {

    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-md">
                <div className="card bg-base-100 w-full shadow-2xl">
                    <div className="card-body p-8 lg:p-10 xl:p-12">
                        <h1 className="text-3xl font-bold text-black mb-4 text-center">Create an Account</h1>

                        <form>
                            <fieldset className="fieldset space-y-1">

                                {/* Name */}
                                <div className="form-control">
                                    <label className="label text-black">Name</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaUser />
                                        </span>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full pl-10" // Added pl-10 for icon padding
                                            placeholder="Full Name"

                                        />
                                    </div>

                                </div>


                                {/* Email */}
                                <div className="form-control">
                                    <label className="label text-black">Email</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaEnvelope />
                                        </span>
                                        <input
                                            type="email"
                                            className="input input-bordered w-full pl-10"
                                            placeholder="Email"

                                        />
                                    </div>

                                </div>

                                {/* Password */}
                                <div className="form-control">
                                    <label className="label text-black">Password</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 z-10">
                                            <FaLock />
                                        </span>
                                        <input
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