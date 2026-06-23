function TaskCard({
    task,
    onStartProgress,
    onMarkCompleted,
    onDelete
}) {

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getStatusBadge = () => {

        switch (task.status) {

            case "Pending":
                return (
                    <span className="badge bg-warning text-dark">
                        Pending
                    </span>
                );

            case "In Progress":
                return (
                    <span className="badge bg-primary">
                        In Progress
                    </span>
                );

            case "Completed":
                return (
                    <span className="badge bg-success">
                        Completed
                    </span>
                );

            default:
                return (
                    <span className="badge bg-secondary">
                        Unknown
                    </span>
                );
        }
    };

    return (
        <div className="card task-card shadow-sm border-0 mb-3">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                    <h5 className="fw-bold">
                        {task.title}
                    </h5>

                    {getStatusBadge()}

                </div>

                <hr />

                <p className="text-muted">

                    {task.description
                        ? task.description
                        : "No description provided."}

                </p>

                <p className="small text-secondary mb-3">

                    📅 Created:
                    {" "}
                    {formatDate(task.created_at)}

                </p>

                <div className="d-flex flex-wrap gap-2">

                    {task.status === "Pending" && (
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                onStartProgress(task.id)
                            }
                        >
                            🚀 Start Progress
                        </button>
                    )}

                    {task.status === "In Progress" && (
                        <button
                            className="btn btn-success"
                            onClick={() =>
                                onMarkCompleted(task.id)
                            }
                        >
                            ✅ Mark Completed
                        </button>
                    )}

                    {task.status === "Completed" && (
                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                onDelete(task.id)
                            }
                        >
                            🗑 Delete
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default TaskCard;