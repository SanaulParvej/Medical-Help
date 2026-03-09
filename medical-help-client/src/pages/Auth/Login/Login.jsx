import React, { use } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';


const Login = () => {
    const { userLogin } = use(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
            .then(result => {
                Swal.fire({
                    title: "Login Successfully!",
                    icon: "success",
                    draggable: true,
                });
                console.log(result.user);
                navigate(from)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
            <div className="card-body p-8">
                <h1 className="text-3xl font-bold text-black mb-4 text-center">Login Now</h1>
                <form onSubmit={handleLogin}>
                    <fieldset>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full mb-2"
                            placeholder="Email"
                            name='email'
                        />

                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="input input-bordered w-full mb-2"
                            placeholder="Password"
                            name='password'
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