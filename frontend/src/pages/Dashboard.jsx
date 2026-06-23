import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import {
    getTasks,
    updateTask,
    deleteTask
} from "../services/taskService";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {

        const response = await getTasks();

        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleComplete = async (id) => {

        await updateTask(id, "Completed");

        fetchTasks();
    };

    const handleDelete = async (id) => {

        await deleteTask(id);

        fetchTasks();
    };

    return (
        <div className="container mt-4">

            <h2>All Tasks</h2>

            {tasks.length === 0 ? (
                <p>No Tasks Found</p>
            ) : (
                tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onComplete={handleComplete}
                        onDelete={handleDelete}
                    />
                ))
            )}

        </div>
    );
}

export default Dashboard;