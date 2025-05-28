import React from "react";

// Badge Colors
const getStatusColor = (task) => {
    if (task.failed) return "bg-rose-700";
    if (task.completed) return "bg-emerald-700";
    if (task.newTask) return "bg-purple-700";
    if (task.active) return "bg-indigo-700";
    return "bg-gray-700";
};

// Card Colors
const getBoxColor = (task) => {
    if (task.failed) return "bg-rose-600";
    if (task.completed) return "bg-emerald-600";
    if (task.newTask) return "bg-purple-600";
    if (task.active) return "bg-indigo-600";
    return "bg-slate-600";
};

// Status Text
const getStatusText = (task) => {
    if (task.failed) return "Failed";
    if (task.completed) return "Completed";
    if (task.newTask) return "New";
    if (task.active) return "Accepted";
    return "Task";
};

const TaskList = ({ tasks, updateTask }) => {
    // Handlers use the updateTask prop callback to update the parent state
    const handleDone = (index) => {
        updateTask(index, {
            active: false,
            newTask: false,
            completed: true,
            failed: false,
        });
    };

    const handleFail = (index) => {
        updateTask(index, {
            active: false,
            newTask: false,
            completed: false,
            failed: true,
        });
    };

    return (
        <div
            id="tasklist"
            className="h-[50%] overflow-x-auto flex items-start gap-5 flex-nowrap w-full py-5 mt-10 scrollbar-hide"
        >
            {tasks.map((task, index) => (
                <div
                    key={index}
                    className={`flex-shrink-0 w-[300px] min-h-[250px] p-5 rounded-xl text-white shadow-md transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer ${getBoxColor(task)}`}
                >
                    {/* Category + Status */}
                    <div className="flex justify-between items-center text-xs mb-1">
                        <span className="px-2 py-1 rounded-full bg-white bg-opacity-20 text-white">
                            {task.category}
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full font-semibold ${getStatusColor(task)}`}
                        >
                            {getStatusText(task)}
                        </span>
                    </div>

                    {/* Title/Description */}
                    <h2 className="mt-3 text-xl font-bold">{task.taskTitle}</h2>
                    <p className="text-sm mt-2 text-gray-100">{task.taskDescription}</p>
                    <div className="text-xs text-gray-200 mt-2">{task.taskDate}</div>

                    {/* Only show buttons for new or active tasks */}
                    {(task.newTask || task.active) && (
                        <div className="flex justify-between mt-4 gap-2">
                            <button
                                onClick={() => handleDone(index)}
                                className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white text-xs px-3 py-1 rounded-full"
                            >
                                Mark as Done
                            </button>
                            <button
                                onClick={() => handleFail(index)}
                                className="flex-1 bg-rose-700 hover:bg-rose-600 text-white text-xs px-3 py-1 rounded-full"
                            >
                                Mark as Failed
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TaskList;
