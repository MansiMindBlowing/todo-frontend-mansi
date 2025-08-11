

import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { logout } from "../features/auth/authSlice";
import InvitePage from '../pages/InvitePage';
import Modal from './Modal';


import { HiOutlinePlus } from "react-icons/hi2";
import { FaClipboardList } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    const isAdmin = isAuthenticated && user?.role === 'admin';

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 w-full h-16 px-10 flex items-center justify-between">
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
                {/* <div className="flex justify-between h-16"> */}
                    {/* <div className="flex items-center"> */}
                        <div className="flex-shrink-0 flex items-center space-x-2">
                           
                            <FaClipboardList className="h-6 w-6 text-indigo-600" />
                            <span className="text-xl font-bold text-gray-900">TaskMaster</span>
                        </div>
                    {/* </div> */}
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition duration-200">Home</a>
                                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition duration-200">Tasks</a>
                                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition duration-200">Projects</a>
                                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition duration-200">Team</a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                   
                            {isAdmin && (
                                <button 
                                    type="button" 
                                    className="p-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition duration-200 cursor-pointer"
                                    onClick={() => setIsAddUserModalOpen(true)}
                                >
                                    <span className="sr-only">Add new user</span>
                                 
                                    <HiOutlinePlus className="h-6 w-6" />
                                </button>
                            )}

                          
                            {isAuthenticated && (
                                <button
                                    type="button" 
                                    className="ml-3 p-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition duration-200"
                                    onClick={handleLogout}
                                >
                                    <span className="sr-only">Sign out</span>
                                   
                                    <RxAvatar className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                    </div>
                {/* </div> */}
            {/* </div> */}
           
            <Modal isOpen={isAddUserModalOpen} onClose={() => setIsAddUserModalOpen(false)} title="Add New User">
                <InvitePage onCancel={() => setIsAddUserModalOpen(false)} />
            </Modal>
        </nav>
    );
};

export default Navbar;
