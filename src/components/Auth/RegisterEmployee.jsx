import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider"; // Adjust path if necessary

const RegisterEmployee = ({ onBackToDashboard }) => { // Added prop to go back
    const { user: authUser, updateUserAuthData } = useContext(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        // Basic validation
        if (!firstName || !lastName || !email || !password) {
            setMessage({ type: 'error', text: 'Please fill in all fields.' });
            return;
        }

        // Check if email already exists
        const emailExists = authUser.employees.some(emp => emp.email === email);
        if (emailExists) {
            setMessage({ type: 'error', text: 'Employee with this email already exists.' });
            return;
        }

        // Generate a simple unique ID (for demonstration)
        const newEmployeeId = authUser.employees.length > 0 ? Math.max(...authUser.employees.map(e => e.id)) + 1 : 1;

        const newEmployee = {
            id: newEmployeeId,
            first_name: firstName,
            last_name: lastName,
            name: `${firstName} ${lastName}`, // Full name for convenience
            email: email,
            password: password, // In a real app, hash this password!
            tasks: [], // New employees start with no tasks
            taskCount: {
                active: 0,
                newTask: 0,
                completed: 0,
                failed: 0
            }
        };

        const updatedEmployees = [...authUser.employees, newEmployee];

        // Update the global state and localStorage
        updateUserAuthData(updatedEmployees, authUser.admin);

        // Clear form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');

        setMessage({ type: 'success', text: 'New employee registered successfully!' });

        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-8">
            {/* Changed background to a gradient matching the theme */}
            <div className="bg-gradient-to-br from-purple-800 via-indigo-800 to-gray-800 shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-6 text-white">Register New Employee</h2>

                {message.text && (
                    <div className={`p-3 mb-4 rounded-lg text-center font-medium ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-gray-300 font-medium mb-1">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-gray-300 font-medium mb-1">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-300 font-medium mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john.doe@example.com"
                            className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-300 font-medium mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition duration-200"
                    >
                        Register Employee
                    </button>
                    <button
                        type="button"
                        onClick={onBackToDashboard}
                        className="mt-2 bg-gray-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
                    >
                        Back to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterEmployee;