import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider"; // Adjust path if necessary

const AllTask = () => {
    const { user: authUser, loading: authLoading } = useContext(AuthContext);
    const [activeView, setActiveView] = useState('allTasks'); // 'allTasks' or 'employeeSummary'

    if (authLoading || !authUser || !authUser.employees) {
        return (
            <div className="text-center text-gray-400 mt-8">
                Loading all tasks...
            </div>
        );
    }

    // --- Data Preparation for All Tasks View ---
    const allEmployeeTasks = authUser.employees.flatMap(employee =>
        employee.tasks.map(task => ({
            ...task,
            employeeName: employee.name,
            employeeEmail: employee.email
        }))
    );

    allEmployeeTasks.sort((a, b) => {
        const dateA = new Date(a.taskDate);
        const dateB = new Date(b.taskDate);
        if (dateA - dateB !== 0) {
            return dateA - dateB;
        }
        return a.employeeName.localeCompare(b.employeeName);
    });

    // Helper function to get status badge style
    const getStatusBadge = (task) => {
        if (task.completed) return "bg-green-600";
        if (task.failed) return "bg-red-600";
        if (task.newTask) return "bg-blue-600";
        if (task.active) return "bg-yellow-600";
        return "bg-gray-500";
    };

    const getStatusText = (task) => {
        if (task.completed) return "Completed";
        if (task.failed) return "Failed";
        if (task.newTask) return "New";
        if (task.active) return "Active";
        return "Unknown";
    };

    // --- Data Preparation for Employee Summary View ---
    const employeeSummaries = authUser.employees.map(employee => {
        const newTaskCount = employee.tasks.filter(t => t.newTask).length;
        const activeTaskCount = employee.tasks.filter(t => t.active).length;
        const completedTaskCount = employee.tasks.filter(t => t.completed).length;
        const failedTaskCount = employee.tasks.filter(t => t.failed).length;

        return {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            taskCount: {
                newTask: newTaskCount,
                active: activeTaskCount,
                completed: completedTaskCount,
                failed: failedTaskCount
            }
        };
    });

    return (
        <div className="mt-8 bg-gradient-to-br from-purple-800 via-indigo-800 to-gray-800 rounded-xl shadow-lg p-6"> {/* Changed background to gradient */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">
                    {activeView === 'allTasks' ? 'All Employee Tasks' : 'Employee Task Summary'}
                </h2>
                <div className="flex bg-gray-700 rounded-lg p-1">
                    <button
                        onClick={() => setActiveView('allTasks')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                            ${activeView === 'allTasks' ? 'bg-emerald-600 text-white shadow' : 'text-gray-300 hover:bg-gray-600'}`}
                    >
                        All Tasks
                    </button>
                    <button
                        onClick={() => setActiveView('employeeSummary')}
                        className={`ml-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                            ${activeView === 'employeeSummary' ? 'bg-emerald-600 text-white shadow' : 'text-gray-300 hover:bg-gray-600'}`}
                    >
                        Employee Summary
                    </button>
                </div>
            </div>

            {activeView === 'allTasks' ? (
                // --- All Tasks List View ---
                allEmployeeTasks.length === 0 ? (
                    <div className="text-center text-gray-400 mt-8">
                        No tasks found across all employees.
                    </div>
                ) : (
                    <div className="max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                        {allEmployeeTasks.map((task, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 p-4 rounded-lg mb-4 border border-gray-600 hover:border-emerald-500 transition-all duration-200"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-emerald-400">{task.taskTitle}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(task)}`}>
                                        {getStatusText(task)}
                                    </span>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">{task.taskDescription}</p>
                                <div className="flex justify-between items-center text-gray-400 text-xs">
                                    <span>Assigned to: <span className="font-medium text-white">{task.employeeName}</span></span>
                                    <span>Due: <span className="font-medium text-white">{task.taskDate}</span></span>
                                    <span>Category: <span className="font-medium text-white">{task.category}</span></span>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                // --- Employee Task Summary Table View ---
                employeeSummaries.length === 0 ? (
                    <div className="text-center text-gray-400 mt-8">
                        No employee summaries available.
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-600">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Employee Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        New
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Active
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Completed
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Failed
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {employeeSummaries.map((summary) => (
                                    <tr key={summary.id} className="hover:bg-gray-700 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                            {summary.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                                            {summary.taskCount.newTask}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">
                                            {summary.taskCount.active}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                                            {summary.taskCount.completed}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">
                                            {summary.taskCount.failed}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}

            {/* Custom scrollbar styling (can be moved to a global CSS file if preferred) */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #374151; /* gray-700 */
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #10B981; /* emerald-500 */
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #059669; /* emerald-600 */
                }
            `}</style>
        </div>
    );
};

export default AllTask;
