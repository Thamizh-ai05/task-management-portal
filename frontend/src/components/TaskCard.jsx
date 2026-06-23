function TaskCard({ task, onComplete, onDelete }) {

    return (
        <div className="card mb-3">
            <div className="card-body">

                <h5>{task.title}</h5>

                <p>{task.description}</p>

                <p>
                    <strong>Status:</strong> {task.status}
                </p>

                <p>
                    <strong>Created:</strong>
                    {" "}
                    {new Date(task.created_at).toLocaleString()}
                </p>

                <button
                    className="btn btn-success me-2"
                    onClick={() => onComplete(task.id)}
                >
                    Complete
                </button>

                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>

            </div>
        </div>
    );
}

export default TaskCard;