import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // holds { employees, admin }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Seed data if missing
        if (!localStorage.getItem("employees") || !localStorage.getItem("admin")) {
            setLocalStorage();
        }
        const storedData = getLocalStorage();
        setUser(storedData);
        setLoading(false);
    }, []);

    // New function to update user data and persist to localStorage
    const updateUserAuthData = (newEmployees, newAdmin) => {
        const updatedData = {
            employees: newEmployees,
            admin: newAdmin // Ensure admin data is also passed or handled
        };
        localStorage.setItem('employees', JSON.stringify(newEmployees));
        localStorage.setItem('admin', JSON.stringify(newAdmin)); // Persist admin data too
        setUser(updatedData); // Update the context state
    };

    return (
        <AuthContext.Provider value={{ user, loading, updateUserAuthData }}> {/* Pass the new function */}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
