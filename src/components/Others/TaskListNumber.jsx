import React from "react";

const TaskListNumber = ({ data }) => {
    const cards = [
        { count: data.taskCount.newTask, label: "New Task", color: "bg-red-600" },
        { count: data.taskCount.completed, label: "Completed Task", color: "bg-blue-600" },
        { count: data.taskCount.active, label: "Accepted Task", color: "bg-green-600" },
        { count: data.taskCount.failed, label: "Failed Task", color: "bg-yellow-500" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`rounded-xl p-6 ${card.color} bg-opacity-90 shadow-lg`}
                >
                    <h2 className="text-3xl font-bold text-white">{card.count}</h2>
                    <h3 className="text-lg font-medium text-gray-200">{card.label}</h3>
                </div>
            ))}
        </div>
    );
};

export default TaskListNumber;