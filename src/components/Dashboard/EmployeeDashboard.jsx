import React, { useState, useEffect } from "react";
import TaskList from "../Others/TaskList";
import TaskListNumber from "../Others/TaskListNumber";
import Header from "../Others/Header";

const EmployeeDashboard = ({ userData }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (userData && userData.tasks) {
            setTasks(userData.tasks);
        }
    }, [userData]);

    // This check is now redundant if App.jsx handles the loading state well,
    // but keeping it as a fallback won't hurt.
    if (!userData || !userData.tasks || tasks.length === 0) {
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="text-center text-white text-2xl font-semibold p-6 rounded-lg">
                ...
            </div>
        </div>
    }

    // Extract first name for Header
    const firstName = userData.first_name || "User"; // Use first_name directly if available

    // Compute task counts
    const taskCount = {
        newTask: tasks.filter((t) => t.newTask).length,
        completed: tasks.filter((t) => t.completed).length,
        active: tasks.filter((t) => t.active).length,
        failed: tasks.filter((t) => t.failed).length,
    };

    // Handler to update task status
    const updateTask = (index, updates) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index] = { ...updatedTasks[index], ...updates };
            return updatedTasks;
        });
    };

    return (
        <div className="p-10 text-white">
            <Header data={{ first_name: firstName }} />
            <TaskListNumber data={{ taskCount }} />
            <TaskList tasks={tasks} updateTask={updateTask} />
        </div>
    );
};

export default EmployeeDashboard;