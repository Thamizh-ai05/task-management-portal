import { useState } from "react";
import { createTask } from "../services/taskService";

function AddTask() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");

    const handleSubmit = async (e) => {

        e.preventDefault();

        await createTask({
            title,
            description,
            status
        });

        alert("Task Added");

        setTitle("");
        setDescription("");
        setStatus("Pending");
    };

    return (
        <div className="container mt-4">

            <h2>Add Task</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <select
                    className="form-control mb-3"
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >
                    <option>Pending</option>
                    <option>In Progress</option>
                </select>

                <button
                    className="btn btn-primary"
                >
                    Add Task
                </button>

            </form>

        </div>
    );
}

export default AddTask;