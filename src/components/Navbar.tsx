import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar: React.FC = () => {
    const { user } = useAuth(); // Replace with actual context value

    return (
        <nav className="bg-gradient-to-r from-blue-500 to-sky-400">
            <div className="container py-4 px-6 min-w-full flex justify-between items-center">
                {/* Logo & Title */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                            src="/logo.jpg"
                            alt="Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-xl font-extrabold text-white sm:text-2xl">
                        Event
                        <span className="text-rose-300">Stream</span>
                    </span>
                </Link>

                {/* Authentication Buttons */}
                {user ? (
                    <Link to="/me">
                        <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-indigo-100 hover:shadow-lg">
                            <img
                                src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                alt="User Icon"
                                className="w-6 h-6 rounded-full"
                            />
                            <span className="font-medium">{user.name}</span>
                        </button>
                    </Link>
                ) : (
                    <Link to="/login">
                        <button className="bg-white px-6 py-2 rounded-full font-medium transition duration-300 ease-in-out hover:bg-indigo-100 hover:shadow-lg">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
