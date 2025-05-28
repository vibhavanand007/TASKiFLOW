import React, { useState } from "react";

const Login = ({ handleLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        handleLogin(email, password)
        setEmail('');
        setPassword('');
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-[#111] text-white">
            <div className="border border-emerald-500 rounded-2xl p-10 w-full max-w-md shadow-xl">
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-transparent border border-emerald-600 text-white placeholder-gray-400 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-transparent border border-emerald-600 text-white placeholder-gray-400 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-medium py-3 rounded-full transition duration-200"
                    >
                        Login
                    </button>
                </form>
                {/* <p className="mt-4 text-sm text-center text-gray-400">
                    Don’t have an account? <span className="text-emerald-400 hover:underline cursor-pointer">Register</span>
                </p> */}
            </div>
        </div>
    );
};

export default Login;