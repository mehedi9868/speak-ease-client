import { useForm } from "react-hook-form";
import googleLogo from "../../assets/icons/google.svg";
import { Link } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <>
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
                    <div>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className='input input-bordered w-full'
                            {...register("password", { required: true })}
                        />
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
                <button className="btn btn-outline w-full mt-4 flex items-center gap-2">
                    <img src={googleLogo} alt="google login" className="w-5" />
                    <span>Log in with Google</span>
                </button>
            </div>
        </>
    );
};

export default Login;