// src/components/Dashboard/EmployeeDashboard.jsx (or wherever TaskList is rendered)
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider"; // Adjust path if necessary
import TaskList from "../Others/TaskList"; // Adjust path if necessary
import Header from "../Others/Header"; // Assuming you have a Header component
import EmployeeDashboardHeader from "./EmployeeDashboardHeader"; // Assuming this exists

const EmployeeDashboard = () => {
    const { user: authUser, updateUserAuthData } = useContext(AuthContext);
    const [employeeTasks, setEmployeeTasks] = useState([]);
    const [employeeInfo, setEmployeeInfo] = useState(null); // To hold current employee data

    useEffect(() => {
        if (authUser && !authUser.admin) { // Ensure it's an employee user
            // Find the current employee's data from the authUser.employees array
            const currentEmployee = authUser.employees.find(
                (emp) => emp.email === authUser.email
            );
            if (currentEmployee) {
                setEmployeeInfo(currentEmployee);
                setEmployeeTasks(currentEmployee.tasks);
            }
        }
    }, [authUser]); // Re-run when authUser changes

    // This is the crucial function that needs to be updated for persistence
    const updateTaskStatus = (taskIndex, newStatusFlags) => {
        // Create a deep copy of the current authUser to avoid direct mutation
        const updatedAuthUser = JSON.parse(JSON.stringify(authUser));

        // Find the current employee in the updated user data
        const employeeToUpdateIndex = updatedAuthUser.employees.findIndex(
            (emp) => emp.email === updatedAuthUser.email
        );

        if (employeeToUpdateIndex === -1) {
            console.error("Current employee not found in authUser data.");
            return;
        }

        const currentEmployee = updatedAuthUser.employees[employeeToUpdateIndex];

        // Ensure tasks exist and the index is valid
        if (!currentEmployee.tasks || taskIndex >= currentEmployee.tasks.length) {
            console.error("Invalid task index or tasks array missing.");
            return;
        }

        const taskToUpdate = currentEmployee.tasks[taskIndex];

        // --- Update task status flags ---
        const oldStatus = {
            active: taskToUpdate.active,
            newTask: taskToUpdate.newTask,
            completed: taskToUpdate.completed,
            failed: taskToUpdate.failed
        };

        taskToUpdate.active = newStatusFlags.active;
        taskToUpdate.newTask = newStatusFlags.newTask;
        taskToUpdate.completed = newStatusFlags.completed;
        taskToUpdate.failed = newStatusFlags.failed;

        // --- Update taskCount based on status change ---
        // Decrement old status count
        if (oldStatus.newTask) currentEmployee.taskCount.newTask--;
        if (oldStatus.active) currentEmployee.taskCount.active--;
        if (oldStatus.completed) currentEmployee.taskCount.completed--;
        if (oldStatus.failed) currentEmployee.taskCount.failed--;

        // Increment new status count
        if (taskToUpdate.newTask) currentEmployee.taskCount.newTask++;
        if (taskToUpdate.active) currentEmployee.taskCount.active++;
        if (taskToUpdate.completed) currentEmployee.taskCount.completed++;
        if (taskToUpdate.failed) currentEmployee.taskCount.failed++;
        // If a new task is marked 'active' from 'new', the 'new' count should decrease
        // (The logic above handles this by decrementing the old status and incrementing the new)

        // --- Update the employee object in the main array ---
        updatedAuthUser.employees[employeeToUpdateIndex] = currentEmployee;

        // --- Update the local state for immediate UI reflection ---
        setEmployeeTasks(currentEmployee.tasks);
        setEmployeeInfo(currentEmployee); // Update employee info with new taskCount

        // --- PERSIST TO LOCAL STORAGE ---
        // This is the critical step to make changes permanent
        updateUserAuthData(updatedAuthUser.employees, updatedAuthUser.admin);
    };

    if (!authUser || authUser.admin) {
        // Handle case where admin tries to access or no user is logged in
        return (
            <div className="text-center text-white text-xl mt-20">
                Access Denied. Please log in as an employee.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 text-white">
            <Header /> {/* Your existing Header component */}
            {employeeInfo && (
                <EmployeeDashboardHeader employee={employeeInfo} /> // Pass employee info for task counts
            )}

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
                {employeeTasks.length > 0 ? (
                    <TaskList tasks={employeeTasks} updateTask={updateTaskStatus} />
                ) : (
                    <p className="text-center text-gray-400 mt-10">No tasks assigned yet.</p>
                )}
            </main>
        </div>
    );
};

export default EmployeeDashboard;