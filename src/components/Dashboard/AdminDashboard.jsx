import React, { useState } from "react";
import Header from "../Others/Header";
import CreateTask from "../Others/CreateTask";
import AllTask from "../Others/AllTask";
import RegisterEmployee from "../Auth/RegisterEmployee"; // Import the new component

const AdminDashboard = ({ userData }) => {
    const [activeAdminView, setActiveAdminView] = useState('createTask'); // 'createTask' or 'registerEmployee'

    if (!userData) {
        return <div className="text-center mt-10 text-white">Loading admin data...</div>;
    }

    return (
        <div className="p-10 text-white bg-gray-900 min-h-screen">
            <Header data={{ first_name: userData.first_name || "Admin" }} />

            {/* Admin View Switcher */}
            <div className="flex justify-center mb-8">
                <div className="flex bg-gray-700 rounded-lg p-1">
                    <button
                        onClick={() => setActiveAdminView('createTask')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                            ${activeAdminView === 'createTask' ? 'bg-emerald-600 text-white shadow' : 'text-gray-300 hover:bg-gray-600'}`}
                    >
                        Create Task
                    </button>
                    <button
                        onClick={() => setActiveAdminView('registerEmployee')}
                        className={`ml-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                            ${activeAdminView === 'registerEmployee' ? 'bg-emerald-600 text-white shadow' : 'text-gray-300 hover:bg-gray-600'}`}
                    >
                        Register Employee
                    </button>
                </div>
            </div>

            {/* Conditionally render CreateTask or RegisterEmployee */}
            {activeAdminView === 'createTask' ? (
                <CreateTask />
            ) : (
                <RegisterEmployee onBackToDashboard={() => setActiveAdminView('createTask')} />
            )}

            {/* AllTask is always shown below, regardless of the admin action above */}
            <AllTask />
        </div>
    );
};

export default AdminDashboard;
