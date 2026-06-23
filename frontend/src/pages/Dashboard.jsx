import { useEffect, useState } from "react";
import {
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskService";

import Loader from "../components/Loader";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await getTasks();

      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let result = [...tasks];

    if (filter !== "All") {
      result = result.filter(
        (task) => task.status === filter
      );
    }

    if (search.trim() !== "") {
      result = result.filter((task) =>
        task.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredTasks(result);
  }, [tasks, filter, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    await deleteTask(id);

    fetchTasks();
  };

  const handleStatusChange = async (
    id,
    status
  ) => {
    await updateTask(id, status);

    fetchTasks();
  };

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const getBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";

      case "In Progress":
        return "bg-primary";

      case "Completed":
        return "bg-success";

      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>

      <h2 className="page-title">
        Dashboard
      </h2>

      {/* Statistics */}

      <div className="row mb-4">

        <div className="col-md-3 mb-3">
          <div className="card card-shadow">
            <div className="card-body text-center">
              <h6>Total Tasks</h6>
              <h3>{totalTasks}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card card-shadow">
            <div className="card-body text-center">
              <h6>Pending</h6>
              <h3>{pendingTasks}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card card-shadow">
            <div className="card-body text-center">
              <h6>In Progress</h6>
              <h3>{inProgressTasks}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card card-shadow">
            <div className="card-body text-center">
              <h6>Completed</h6>
              <h3>{completedTasks}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* Search */}

      <div className="row mb-3">

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search Task..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

      </div>

      {/* Filters */}

      <div className="mb-4">

        <button
          className={`btn me-2 ${
            filter === "All"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() => setFilter("All")}
        >
          All
        </button>

        <button
          className={`btn me-2 ${
            filter === "Pending"
              ? "btn-warning"
              : "btn-outline-warning"
          }`}
          onClick={() =>
            setFilter("Pending")
          }
        >
          Pending
        </button>

        <button
          className={`btn me-2 ${
            filter === "In Progress"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() =>
            setFilter("In Progress")
          }
        >
          In Progress
        </button>

        <button
          className={`btn ${
            filter === "Completed"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() =>
            setFilter("Completed")
          }
        >
          Completed
        </button>

      </div>

      {/* Empty State */}

      {filteredTasks.length === 0 ? (
        <div className="alert alert-info">
          No Tasks Found
        </div>
      ) : (
        <div className="table-responsive">

          <table className="table table-hover table-bordered align-middle">

            <thead className="table-dark">

              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created Date</th>
                <th width="350">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredTasks.map((task) => (

                <tr key={task.id}>

                  <td>{task.title}</td>

                  <td>
                    {task.description}
                  </td>

                  <td>

                    <span
                      className={`badge ${getBadgeClass(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td>
                    {new Date(
                      task.created_at
                    ).toLocaleString()}
                  </td>

                  <td>

                    {/* Pending */}

                    {task.status ===
                      "Pending" && (
                      <>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() =>
                            handleStatusChange(
                              task.id,
                              "In Progress"
                            )
                          }
                        >
                          Start Process
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(
                              task.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {/* In Progress */}

                    {task.status ===
                      "In Progress" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handleStatusChange(
                              task.id,
                              "Completed"
                            )
                          }
                        >
                          Complete
                        </button>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            handleStatusChange(
                              task.id,
                              "Pending"
                            )
                          }
                        >
                          Resume
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(
                              task.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {/* Completed */}

                    {task.status ===
                      "Completed" && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(
                            task.id
                          )
                        }
                      >
                        Delete
                      </button>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Dashboard;