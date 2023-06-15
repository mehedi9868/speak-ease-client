import { useForm } from "react-hook-form";
import googleLogo from "../../assets/icons/google.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit } = useForm();
    const { login, googleLogin, loading } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        login(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                if (loggedUser) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful!!',
                        text: 'Login Successful',
                    })
                    navigate(from, { replace: true });
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    //  social login: google 
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                if (loggedUser) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful!!',
                        text: 'Login Successful',
                    });
                    const savedUser = { name: loggedUser?.displayName, photo: loggedUser?.photoURL, email: loggedUser?.email, role: 'student' }
                    axios.post(`https://speak-ease-server.vercel.app/all-users`, savedUser)

                    // redirect to desired route
                    navigate(from, { replace: true });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <>
            {/* loading state loader */}
            <div className='flex justify-center mt-5 mb-5'>
                {
                    loading && <FadeLoader color="#36d7b7" />
                }
            </div>
            {/* loading state loader */}
            <h2 className="text-2xl text-center font-bold my-10">Please Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-1/3 mx-auto">

                    {/* email field  */}
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className='input input-bordered w-full'
                            {...register("email", { required: true })}
                        />
                    </div>
                    {/* password field  */}
                    <div className="relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className='input input-bordered w-full'
                            {...register("password", { required: true })}
                        />
                        <div onClick={() => setShowPassword(!showPassword)} className="absolute top-[50%] mt-2 right-5 cursor-pointer">
                            {showPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                        </div>
                    </div>

                    {/* submit field  */}
                    <button type="submit" className="btn btn-primary my-4">Login</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Register</Link>
                    </p>
                </div>
            </form>
            {/* social login  */}
            <div className="w-1/3 mx-auto mb-10">
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin} className="btn btn-outline w-full mt-4 flex items-center gap-2">
                    <img src={googleLogo} alt="google login" className="w-5" />
                    <span>Log in with Google</span>
                </button>
            </div>
        </>
    );
};

export default Login;