import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import { FaUsers, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const DashboardHeader = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, loading, user } = useSelector((state) => state.User)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleToggleDrawer = () => {
        setShow(!show);
    };

    const handleCloseDrawer = () => {
        setShow(false);
    };

    const handleLogout = () => {
        try {
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.log("Error while logout")
        }
    }

    return (
        <>
            <div
                className={`bg-gradient-to-b from-purple-600 to-pink-500 fixed w-full z-50 transition-all duration-300 `}
            >
                <div className="lg:hidden z-50 fixed">
                    <button
                        onClick={handleToggleDrawer}
                        className="fixed right-5 top-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xl p-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-200"
                    >
                        {!show ? <GiHamburgerMenu /> : <IoCloseSharp size={20} />}
                    </button>
                </div>
                <div className="fixed left-5 top-5 z-50 lg:hidden">
                    <Link to="/" className="block mb-8 " onClick={handleCloseDrawer}>
                        <h4 className="text-3xl font-bold text-purple-700">
                            Task <span className="text-pink-500">Management System</span>
                        </h4>
                    </Link>
                </div>
            </div>

            <div
                onClick={handleCloseDrawer}
                className={`w-full sm:w-[300px] bg-white h-full fixed top-0 shadow-lg z-50 ${show ? "left-0" : "-left-full"
                    } transition-all duration-300 p-6 flex flex-col justify-between border-r border-gray-300 lg:left-0`}
            >
                <div className="relative">
                    <Link to="/" className="block mb-8 " onClick={handleCloseDrawer}>
                        Task <span className="text-pink-500">Management System</span>
                        <h4 className="text-3xl font-bold text-purple-700"></h4>
                    </Link>

                    <ul className="space-y-6 relative flex flex-col justify-between h-full">
                        {isAuthenticated && user.role === "SuperAdmin" && <li>
                            <Link
                                to="/"
                                className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200 p-2 rounded-lg hover:bg-purple-100"
                                onClick={handleCloseDrawer}
                            >
                                <FaUsers className="text-2xl mr-3 text-purple-600" /> Admins
                            </Link>
                            <Link
                                to="/register-admins"
                                className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200 p-2 rounded-lg hover:bg-purple-100"
                                onClick={handleCloseDrawer}
                            >
                                <FaUsers className="text-2xl mr-3 text-purple-600" /> Register Admin
                            </Link>

                        </li>}

                        {/* Conditional Rendering Based on Authentication */}
                        {!isAuthenticated ? (
                            <li>
                                <Link
                                    to="/signin"
                                    className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200 p-2 rounded-lg hover:bg-purple-100"
                                    onClick={handleCloseDrawer}
                                >
                                    <FaSignInAlt className="text-2xl mr-3 text-green-600" /> Sign In
                                </Link>
                            </li>
                        ) : (
                            <li className="mt-auto">
                                <div
                                    className="flex items-center text-lg font-semibold text-gray-700 hover:text-purple-600 transition-all duration-200 p-2 rounded-lg hover:bg-purple-100 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <FaSignOutAlt className="text-2xl mr-3 text-red-600" /> Logout
                                </div>
                            </li>
                        )}
                    </ul>

                </div>
            </div >
        </>
    );
};

export default DashboardHeader;
