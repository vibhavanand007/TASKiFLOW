const employees = [
    {
        id: 1,
        first_name: "Vibhav",
        last_name: "Anand",
        name: "Vibhav Anand",
        email: "vibhavanand25@gmail.com",
        password: "123",
        tasks: [
            {
                taskTitle: "Design Login Page",
                taskDescription: "Create a responsive login screen for the mobile app.",
                taskDate: "2025-06-01",
                category: "Design",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                taskTitle: "UI Bug Fixes",
                taskDescription: "Fix padding and margin issues in dashboard view.",
                taskDate: "2025-05-27",
                category: "Development",
                active: true,
                newTask: false,
                completed: false,
                failed: false
            },
            {
                taskTitle: "Prototype Feedback",
                taskDescription: "Review feedback and update UI prototype accordingly.",
                taskDate: "2025-05-30",
                category: "Design",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            }
        ],
        taskCount: {
            active: 2,
            newTask: 1,
            completed: 1,
            failed: 0
        }
    },
    {
        id: 2,
        first_name: "Sneha",
        last_name: "Patel",
        name: "Sneha Patel",
        email: "sneha.patel@example.in",
        password: "123",
        tasks: [
            {
                taskTitle: "API Integration",
                taskDescription: "Integrate user service API with frontend.",
                taskDate: "2025-05-28",
                category: "Development",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                taskTitle: "Code Review",
                taskDescription: "Review pull requests from junior developers.",
                taskDate: "2025-05-29",
                category: "Development",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            },
            {
                taskTitle: "Test Coverage",
                taskDescription: "Ensure 85% code coverage with unit tests.",
                taskDate: "2025-06-03",
                category: "Testing",
                active: true,
                newTask: false,
                completed: false,
                failed: false
            },
            {
                taskTitle: "Fix Deployment Issue",
                taskDescription: "Resolve Heroku build errors in staging.",
                taskDate: "2025-05-25",
                category: "DevOps",
                active: false,
                newTask: false,
                completed: false,
                failed: true
            }
        ],
        taskCount: {
            active: 2,
            newTask: 1,
            completed: 1,
            failed: 1
        }
    },
    {
        id: 3,
        first_name: "Amit",
        last_name: "Sharma",
        name: "Amit Sharma",
        email: "amit.sharma@example.in",
        password: "123",
        tasks: [
            {
                taskTitle: "Database Backup",
                taskDescription: "Automate daily backups for PostgreSQL database.",
                taskDate: "2025-05-27",
                category: "DevOps",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            },
            {
                taskTitle: "Server Monitoring",
                taskDescription: "Implement monitoring dashboard for EC2 instance.",
                taskDate: "2025-06-02",
                category: "DevOps",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                taskTitle: "Log Cleanup Script",
                taskDescription: "Write a script to clear old log files.",
                taskDate: "2025-05-31",
                category: "Scripting",
                active: true,
                newTask: false,
                completed: false,
                failed: false
            }
        ],
        taskCount: {
            active: 2,
            newTask: 1,
            completed: 1,
            failed: 0
        }
    },
    {
        id: 4,
        first_name: "Neha",
        last_name: "Gupta",
        name: "Neha Gupta",
        email: "neha.gupta@example.in",
        password: "123",
        tasks: [
            {
                taskTitle: "Client Meeting",
                taskDescription: "Prepare notes for meeting with client X.",
                taskDate: "2025-05-28",
                category: "Management",
                active: false,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                taskTitle: "Report Compilation",
                taskDescription: "Compile Q2 performance report.",
                taskDate: "2025-06-05",
                category: "Analysis",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                taskTitle: "Strategy Review",
                taskDescription: "Review and update marketing strategy.",
                taskDate: "2025-06-01",
                category: "Marketing",
                active: true,
                newTask: false,
                completed: false,
                failed: false
            },
            {
                taskTitle: "Ad Campaign",
                taskDescription: "Launch summer ad campaign.",
                taskDate: "2025-05-26",
                category: "Marketing",
                active: false,
                newTask: false,
                completed: false,
                failed: true
            },
            {
                taskTitle: "Team Survey",
                taskDescription: "Send out employee satisfaction survey.",
                taskDate: "2025-05-29",
                category: "HR",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            }
        ],
        taskCount: {
            active: 3,
            newTask: 3,
            completed: 0,
            failed: 1
        }
    },
    {
        id: 5,
        first_name: "Vikram",
        last_name: "Singh",
        name: "Vikram Singh",
        email: "vikram.singh@example.in",
        password: "123",
        tasks: [
            {
                taskTitle: "Dashboard Redesign",
                taskDescription: "Update dashboard to match new brand style.",
                taskDate: "2025-06-02",
                category: "Design",
                active: true,
                newTask: false,
                completed: false,
                failed: false
            },
            {
                taskTitle: "CSS Cleanup",
                taskDescription: "Refactor redundant CSS code in main stylesheets.",
                taskDate: "2025-06-01",
                category: "Development",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                taskTitle: "Accessibility Review",
                taskDescription: "Ensure all pages meet WCAG 2.1 guidelines.",
                taskDate: "2025-05-30",
                category: "QA",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            }
        ],
        taskCount: {
            active: 2,
            newTask: 1,
            completed: 1,
            failed: 0
        }
    }
];

const admin = [
    {
        id: 1,
        first_name: "Hitler",
        last_name: "Hell",
        name: "Hitler Hell",
        email: "hell@hitler.in",
        password: "123"
    }
];

// Removed localStorage.removeItem("loggedInUser"); from here
export const setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('admin', JSON.stringify(admin))
}

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))

    return { employees, admin }
}