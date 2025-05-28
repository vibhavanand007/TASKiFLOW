import React, { useState, useEffect, useContext } from "react";
import TaskList from "../Others/TaskList";
import TaskListNumber from "../Others/TaskListNumber";
import Header from "../Others/Header";
import { AuthContext } from "../../context/AuthProvider"; // Import AuthContext

const EmployeeDashboard = ({ userData }) => {
    // Access authUser and updateUserAuthData from AuthContext
    const { user: authUser, updateUserAuthData } = useContext(AuthContext);

    const [employeeTasks, setEmployeeTasks] = useState([]);
    const [currentEmployeeData, setCurrentEmployeeData] = useState(null); // State to hold the full current employee object

    useEffect(() => {
        // Ensure authUser and userData are available and consistent
        if (authUser && userData && authUser.employees) {
            // Find the current employee's full data from the AuthContext's employee list
            const foundEmployee = authUser.employees.find(
                (emp) => emp.email === userData.email
            );

            if (foundEmployee) {
                setCurrentEmployeeData(foundEmployee);
                setEmployeeTasks(foundEmployee.tasks);
            } else {
                // This case should ideally be handled by App.jsx, but as a fallback:
                console.warn("Logged in employee data not found in AuthContext. Clearing local data.");
                localStorage.removeItem("loggedInUser");
                // A full page reload might be necessary here if the App.jsx doesn't catch this
                // window.location.reload();
            }
        }
    }, [userData, authUser]); // Depend on userData (from App.jsx) and authUser (from AuthContext)

    // Display a loading message if employee data is not yet available
    // This is a fallback, as App.jsx should handle the primary loading splash
    if (!currentEmployeeData || !employeeTasks) {
        return <div className="text-center mt-10 text-white">Loading employee dashboard...</div>;
    }

    // Extract first name for Header
    const firstName = currentEmployeeData.first_name || "User";

    // Compute task counts from the current employee's data
    const taskCount = {
        newTask: employeeTasks.filter((t) => t.newTask).length,
        completed: employeeTasks.filter((t) => t.completed).length,
        active: employeeTasks.filter((t) => t.active).length,
        failed: employeeTasks.filter((t) => t.failed).length,
    };

    // Handler to update task status and persist to localStorage
    const updateTask = (index, updates) => {
        // Create a deep copy of the current AuthContext user data to ensure immutability
        const updatedAuthUser = JSON.parse(JSON.stringify(authUser));

        // Find the index of the current employee within the copied employees array
        const employeeIndexInAuth = updatedAuthUser.employees.findIndex(
            (emp) => emp.email === currentEmployeeData.email
        );

        if (employeeIndexInAuth === -1) {
            console.error("Error: Current employee not found in AuthContext data during task update.");
            return;
        }

        const employeeToModify = updatedAuthUser.employees[employeeIndexInAuth];

        // Ensure tasks array exists and index is valid
        if (!employeeToModify.tasks || index >= employeeToModify.tasks.length) {
            console.error("Error: Invalid task index during update.");
            return;
        }

        const taskToUpdate = employeeToModify.tasks[index];

        // --- Update taskCount based on status change ---
        // Decrement old status count
        if (taskToUpdate.newTask) employeeToModify.taskCount.newTask--;
        if (taskToUpdate.active) employeeToModify.taskCount.active--;
        if (taskToUpdate.completed) employeeToModify.taskCount.completed--;
        if (taskToUpdate.failed) employeeToModify.taskCount.failed--;

        // Apply new status flags to the task
        employeeToModify.tasks[index] = { ...taskToUpdate, ...updates };

        // Increment new status count
        if (employeeToModify.tasks[index].newTask) employeeToModify.taskCount.newTask++;
        if (employeeToModify.tasks[index].active) employeeToModify.taskCount.active++;
        if (employeeToModify.tasks[index].completed) employeeToModify.taskCount.completed++;
        if (employeeToModify.tasks[index].failed) employeeToModify.taskCount.failed++;

        // Update the local state for immediate UI reflection
        setEmployeeTasks(employeeToModify.tasks);
        setCurrentEmployeeData(employeeToModify); // Update current employee data with new task counts

        // --- PERSIST CHANGES TO LOCAL STORAGE VIA AuthContext ---
        updateUserAuthData(updatedAuthUser.employees, updatedAuthUser.admin);
    };

    return (
        <div className="p-10 text-white min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900"> {/* Applied gradient background */}
            <Header data={{ first_name: firstName }} />
            <TaskListNumber data={{ taskCount }} />
            <TaskList tasks={employeeTasks} updateTask={updateTask} />
        </div>
    );
};

export default EmployeeDashboard;
