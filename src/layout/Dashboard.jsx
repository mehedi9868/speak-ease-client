import axios from 'axios';
import { NavLink, Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaCheckDouble, FaHome, FaPlus, FaSignOutAlt, FaUniversity, FaUsers, FaUsersCog, FaWallet, } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { IoMdSchool } from 'react-icons/io';

import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState({});

    const { user, logout } = useContext(AuthContext);

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

    useEffect(() => {
        axios.get(`https://speak-ease-server.vercel.app/current-user?email=${user?.email}`)
            .then(res => {
                setCurrentUser(res.data)
            })
    }, [user])
    return (
        <>
            <Helmet>
                <title>Speak Ease | Dashboard</title>
            </Helmet>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    {
                        currentUser.role === 'instructor' && (
                            <ul id='active-route' className='menu p-4 w-80 h-full text-gray-600 bg-gray-100 rounded-md' >
                                {/* Sidebar content here */}
                                <li><NavLink className={`font-bold text-base flex items-center ${({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}`} to='/dashboard/add-class'><FaPlus className='w-5 h-5 mr-3' /> Add Class</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/my-classes'><FaUniversity className='w-5 h-5 mr-3' />My Classes</NavLink></li>
                                <div className='w-full px-3 border my-10'></div>
                                <li><NavLink className='font-bold text-base flex items-center' to='/'><FaHome className='w-5 h-5 mr-3' />Home</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/instructors'><GiTeacher className='mr-3' />Instructors</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/classes'><IoMdSchool className='w-5 h-5 mr-2' />Classes</NavLink></li>
                                <li><NavLink onClick={handleLogout} className='font-bold text-base flex items-center' to='/'><FaSignOutAlt className='w-5 h-5 mr-2' />Logout</NavLink></li>
                            </ul>
                        )
                    }
                    {
                        currentUser.role === 'admin' && (
                            <ul className='menu p-4 w-80 h-full text-gray-600 bg-gray-100 rounded-md'>
                                {/* Sidebar content here */}
                                <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/manage-classes'><FaUsersCog className='w-5 h-5 mr-3' />Manage Classes</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/manage-users'><FaUsers className='w-5 h-5 mr-3' /> Manage Users</NavLink></li>
                                <div className='w-full px-3 border my-10'></div>
                                <li><NavLink className='font-bold text-base flex items-center' to='/'><FaHome className='w-5 h-5 mr-3' />Home</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/instructors'><GiTeacher className='mr-3' />Instructors</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/classes'><IoMdSchool className='w-5 h-5 mr-2' />Classes</NavLink></li>
                                <li><NavLink onClick={handleLogout} className='font-bold text-base flex items-center' to='/'><FaSignOutAlt className='w-5 h-5 mr-2' />Logout</NavLink></li>
                            </ul>
                        )
                    }
                    {
                        currentUser.role === 'student' && (
                            <ul className='menu p-4 w-80 h-full text-gray-600 bg-gray-100 rounded-md'>
                                {/* Sidebar content here */}
                                <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/my-selected-classes'><FaCheckDouble className='w-5 h-5 mr-3' /> My Selected Classes</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/my-enrolled-classes'><FaUniversity className='w-5 h-5 mr-3' />My Enrolled Classes</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/dashboard/payment-history'><FaWallet className='w-5 h-5 mr-3' />Payment History</NavLink></li>
                                <div className='w-full px-3 border my-10'></div>
                                <li><NavLink className='font-bold text-base flex items-center' to='/'><FaHome className='w-5 h-5 mr-3' />Home</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/instructors'><GiTeacher className='mr-3' />Instructors</NavLink></li>
                                <li><NavLink className='font-bold text-base flex items-center' to='/classes'><IoMdSchool className='w-5 h-5 mr-2' />Classes</NavLink></li>
                                <li><NavLink onClick={handleLogout} className='font-bold text-base flex items-center' to='/'><FaSignOutAlt className='w-5 h-5 mr-2' />Logout</NavLink></li>
                            </ul>
                        )
                    }

                </div>
            </div>
        </>
    );
};

export default Dashboard;