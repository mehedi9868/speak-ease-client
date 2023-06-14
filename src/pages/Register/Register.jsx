import { useForm } from "react-hook-form";
import googleLogo from "../../assets/icons/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FadeLoader } from "react-spinners";
import axios from "axios";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const { createUser, updateUserData, googleLogin, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const createdUser = result.user;
                console.log(createdUser);
                updateUserData(data.name, data.photoURL)
                    .then(() => {
                        reset();
                    })
                if (createdUser) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful!!',
                        text: 'Your account has been created successfully',
                    })
                }
                const savedUser = { name: data.name, email: data.email, role: 'student' }
                axios.post(`https://speak-ease-server.vercel.app/all-users`, savedUser)

                // redirect to login 
                navigate('/')
            })
            .catch(err => {
                console.log(err);
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
                    const savedUser = { name: loggedUser?.displayName, email: loggedUser?.email, role: 'student' }
                    axios.post(`https://speak-ease-server.vercel.app/all-users`, savedUser)

                    // redirect to login
                    navigate('/')
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
            <h2 className="text-2xl text-center font-bold my-10">Please Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-1/3 mx-auto">
                    {/* name field  */}
                    <div>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                            {...register("name")}
                        />
                        {errors.name && <span className="text-red-500"></span>}
                    </div>
                    {/* email field  */}
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500">Email address is required</span>}
                    </div>
                    {/* password field  */}
                    <div>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className={`input input-bordered w-full  ${errors.password ? 'input-error' : ''}`}
                            {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*\W)/ })}
                        />
                        {errors.password && <span className="text-red-500">Password should be at least 6 characters long, contain a capital letter, and a special character.</span>}
                    </div>
                    {/* confirm password field  */}
                    <div>
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`input input-bordered w-full  ${errors.confirmPassword ? 'input-error' : ''}`}
                            {...register("confirmPassword", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*\W)/, validate: value => value === watch('password') })}
                        />
                        {errors.confirmPassword && <span className="text-red-500">Passwords do not match</span>}
                    </div>

                    {/* photo URL field  */}
                    <div>
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Photo URL"
                            className="input input-bordered w-full "
                            {...register("photoUrl")}
                        />
                    </div>
                    {/* submit field  */}
                    <button type="submit" className="btn btn-primary my-4">Register</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
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

export default Register;
