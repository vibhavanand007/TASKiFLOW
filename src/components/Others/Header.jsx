import React from "react";

const Header = ({ data }) => {
    const logOutBtn = () => {
        localStorage.removeItem("loggedInUser");
        window.location.reload(); // Reloads to clear memory state
    };


    return (
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-800 via-indigo-800 to-gray-800 px-6 py-4 rounded-xl shadow-md mb-6">
            <div>
                <h1 className="text-xl text-indigo-200 font-medium"> {/* Adjusted text color for contrast */}
                    Hello,
                    <br />
                    <span className="text-3xl font-semibold text-white"> {/* Increased font size for prominence */}
                        {data.first_name} 👋
                    </span>
                </h1>
            </div>
            <button
                onClick={logOutBtn}
                className="bg-red-600 hover:bg-red-700 text-white text-base font-medium px-5 py-2 rounded-lg transition duration-200 shadow-lg" // Added shadow for elegance
            >
                Log Out
            </button>
        </div>
    );
};

export default Header;