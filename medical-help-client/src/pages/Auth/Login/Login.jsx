import React from 'react';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link } from 'react-router';

const Login = () => {

    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
            <div className="card-body p-8">
                <h1 className="text-3xl font-bold text-black mb-4 text-center">Login Now</h1>
                <form>
                    <fieldset>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full mb-2"
                            placeholder="Email"
                        />

                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="input input-bordered w-full mb-2"
                            placeholder="Password"
                        />
                        <div className="mb-4 text-right">
                            <a className="text-sm text-blue-600 hover:underline cursor-pointer">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn btn-neutral w-full">Login</button>
                        
                    </fieldset>
                    <p><small>Don't have an account? <Link className='btn-link' to={'/auth/register'}>Register</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;