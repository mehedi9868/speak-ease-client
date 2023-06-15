import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logout, currentUser } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful!!',
                    text: 'Logout Successful',
                })
            })
            .catch(error => console.log(error))
    }
    const menu =
        <>
            <li>
                <Link to="/" className="text-white font-semibold text-base">Home</Link>
            </li>
            <li>
                <Link to="/instructors" className="text-white font-semibold text-base">Instructors</Link>
            </li>
            <li>
                <Link to="/classes" className="text-white font-semibold text-base">Classes</Link>
            </li>
        </>
    return (
        <div className="navbar fixed z-50 bg-opacity-50 bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <h2 className='text-gray-400 text-3xl font-bold' style={{ fontFamily: 'Kalam, cursive' }}>Speak Ease</h2>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menu}
                </ul>
            </div>
            <div className="ml-auto flex items-center">
                {
                    user ?
                        <>
                            {/* profile */}
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} title={user?.displayName} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-lg w-52">
                                    <li>
                                        {user && (
                                            <>
                                                {currentUser?.role === 'admin' ? (
                                                    <Link to="/dashboard/manage-classes">Admin Dashboard</Link>
                                                ) : currentUser?.role === 'instructor' ? (
                                                    <Link to="/dashboard/add-class">Instructor Dashboard</Link>
                                                ) : (
                                                    <Link to="/dashboard/my-selected-classes">Dashboard</Link>
                                                )}
                                            </>
                                        )}
                                    </li>

                                    <li>
                                        <Link to="/" className="" onClick={handleLogout}>Logout</Link>
                                    </li>

                                    <div className="mt-2 text-center">
                                        <hr />
                                        <p className="font-medium mt-2">{user?.email}</p>
                                        <p className="font-bold">Role: (<span className="font-bold text-green-600">{currentUser?.role}</span>)</p>
                                    </div>
                                </ul>
                            </div>
                        </>
                        :
                        <>
                            <div className="navbar-end">
                                <Link to="/login" className="btn btn-link text-white no-underline">Login</Link>
                            </div>
                        </>
                }
            </div>
        </div >
    );
};

export default Navbar;