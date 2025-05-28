import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider"; // Adjust path if necessary

const CreateTask = () => {
    const { user: authUser, updateUserAuthData } = useContext(AuthContext);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [assignedToEmail, setAssignedToEmail] = useState(''); // Will store employee's email
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' }); // For success/error messages

    // Get list of employees for the dropdown
    const employees = authUser?.employees || [];

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' }); // Clear previous messages

        // Basic validation
        if (!taskTitle || !taskDescription || !taskDate || !assignedToEmail || !category) {
            setMessage({ type: 'error', text: 'Please fill in all fields.' });
            return;
        }

        // Find the employee to assign the task to
        const targetEmployeeIndex = employees.findIndex(emp => emp.email === assignedToEmail);

        if (targetEmployeeIndex === -1) {
            setMessage({ type: 'error', text: 'Assigned employee not found.' });
            return;
        }

        const newEmployees = [...employees];
        const targetEmployee = { ...newEmployees[targetEmployeeIndex] };

        // Create the new task object
        const newTask = {
            taskTitle,
            taskDescription,
            taskDate,
            category,
            active: true,
            newTask: true,
            completed: false,
            failed: false
        };

        // Add the new task to the employee's tasks array
        targetEmployee.tasks = [...targetEmployee.tasks, newTask];

        // Update task counts
        targetEmployee.taskCount = {
            ...targetEmployee.taskCount,
            active: targetEmployee.taskCount.active + 1,
            newTask: targetEmployee.taskCount.newTask + 1
        };

        // Update the employee in the newEmployees array
        newEmployees[targetEmployeeIndex] = targetEmployee;

        // Update the global state and localStorage
        updateUserAuthData(newEmployees, authUser.admin); // Pass current admin data as well

        // Clear form fields
        setTaskTitle('');
        setTaskDescription('');
        setTaskDate('');
        setAssignedToEmail('');
        setCategory('');

        setMessage({ type: 'success', text: 'Task created successfully!' });

        // Optionally, clear message after a few seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 mt-8">
            {/* Changed background to a gradient matching the theme */}
            <div className="bg-gradient-to-br from-purple-800 via-indigo-800 to-gray-800 shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-6 text-white">Create New Task</h2>

                {message.text && (
                    <div className={`p-3 mb-4 rounded-lg text-center font-medium ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column */}
                    <div className="lg:w-1/2 flex flex-col gap-3">
                        <div>
                            <label htmlFor="taskTitle" className="block text-gray-300 font-medium mb-1">Task Title</label>
                            <input
                                id="taskTitle"
                                type="text"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                placeholder="Make a UI design"
                                className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="taskDate" className="block text-gray-300 font-medium mb-1">Due Date</label>
                            <input
                                id="taskDate"
                                type="date"
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                                className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="assignTo" className="block text-gray-300 font-medium mb-1">Assign To</label>
                            <select
                                id="assignTo"
                                value={assignedToEmail}
                                onChange={(e) => setAssignedToEmail(e.target.value)}
                                className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            >
                                <option value="" disabled>Select an employee</option>
                                {employees.map(employee => (
                                    <option key={employee.id} value={employee.email}>
                                        {employee.name} ({employee.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-gray-300 font-medium mb-1">Category</label>
                            <input
                                id="category"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Design, Dev, etc."
                                className="w-full p-2.5 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>

                        {/* Create Button */}
                        <button
                            type="submit"
                            className="mt-6 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition duration-200 w-fit"
                        >
                            Create Task
                        </button>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-1/2">
                        <label htmlFor="description" className="block text-gray-300 font-medium mb-1">Description</label>
                        <textarea
                            id="description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            placeholder="Enter task description..."
                            rows="13"
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        ></textarea>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;