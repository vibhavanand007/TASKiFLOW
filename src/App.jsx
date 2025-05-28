import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [isCheckingLoginStatus, setIsCheckingLoginStatus] = useState(true);

  const { user: authUser, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    // If AuthProvider is still loading its initial data from localStorage, wait.
    if (authLoading) {
      return;
    }

    // Once AuthProvider is done loading, we can proceed to check login status.
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && authUser) {
      setUserRole(loggedInUser.role);

      if (loggedInUser.role === "employee") {
        const employee = authUser.employees.find(
          (e) => e.email === loggedInUser.email
        );
        if (employee) {
          setLoggedInUserData(employee);
        } else {
          // If a user was logged in but their data isn't found in AuthContext's data,
          // it means local storage might be stale or data was reset. Log them out.
          localStorage.removeItem("loggedInUser");
          setUserRole(null);
          setLoggedInUserData(null);
        }
      } else if (loggedInUser.role === "admin") {
        const adminUser = authUser.admin.find(
          (a) => a.email === loggedInUser.email
        );
        if (adminUser) {
          setLoggedInUserData(adminUser);
        } else {
          // Similar to employee, clear stale admin login.
          localStorage.removeItem("loggedInUser");
          setUserRole(null);
          setLoggedInUserData(null);
        }
      }
    } else {
      // If no 'loggedInUser' in localStorage, ensure our states reflect that.
      setUserRole(null);
      setLoggedInUserData(null);
    }

    // After checking localStorage and processing AuthContext data, we're done checking login status.
    setIsCheckingLoginStatus(false);
  }, [authUser, authLoading]);

  const handleLogin = (email, password) => {
    // Prevent login attempt if AuthContext data isn't ready yet.
    if (!authUser) {
      alert("Application data not fully loaded. Please try again in a moment.");
      return;
    }

    // Attempt admin login
    const adminUser = authUser.admin.find(
      (a) => a.email === email && a.password === password
    );
    if (adminUser) {
      setUserRole("admin");
      setLoggedInUserData(adminUser);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "admin", email: adminUser.email })
      );
      // Immediately mark as done checking status as user just logged in.
      setIsCheckingLoginStatus(false);
      return;
    }

    // Attempt employee login
    const employee = authUser.employees.find(
      (e) => email === e.email && e.password === password
    );
    if (employee) {
      setUserRole("employee");
      setLoggedInUserData(employee);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "employee", email: employee.email })
      );
      // Immediately mark as done checking status as user just logged in.
      setIsCheckingLoginStatus(false);
      return;
    }

    // If neither admin nor employee credentials match
    alert("Invalid Credentials");
  };

  // Render the full-screen loading overlay if data is still being loaded
  // or if the app is still checking the user's login status from localStorage.
  if (authLoading || isCheckingLoginStatus) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 z-50">
        <div className="text-center text-white text-5xl font-extrabold p-8 rounded-2xl shadow-2xl tracking-wide animate-fade-in">
          TaskFlow App
        </div>
        <div className="text-center text-indigo-200 text-2xl mt-8 animate-pulse">
          Loading...
        </div>
        {/* Add Tailwind CSS animation classes */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
            .animate-fade-in {
              animation: fadeIn 1s ease-out forwards;
            }
            .animate-pulse {
              animation: pulse 1.5s infinite ease-in-out;
            }
          `}
        </style>
      </div>
    );
  }

  // Once loading and login status checks are complete, render the appropriate component.
  return (
    <>
      {!userRole ? (
        <Login handleLogin={handleLogin} />
      ) : userRole === "admin" ? (
        // Ensure loggedInUserData is available before passing to AdminDashboard
        loggedInUserData ? <AdminDashboard userData={loggedInUserData} /> : <div className="flex h-screen w-screen items-center justify-center bg-[#111] text-white">Loading admin dashboard...</div>
      ) : (
        // Ensure loggedInUserData is available before passing to EmployeeDashboard
        loggedInUserData ? <EmployeeDashboard userData={loggedInUserData} /> : <div className="flex h-screen w-screen items-center justify-center bg-[#111] text-white">Loading employee dashboard...</div>
      )}
    </>
  );
};

export default App;
