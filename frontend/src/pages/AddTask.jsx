import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskService";

function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("Pending");

  const [errors, setErrors] = useState({});

  const [loading, setLoading] =
    useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title =
        "Title is required";
    }

    if (!description.trim()) {
      newErrors.description =
        "Description is required";
    } else if (
      description.trim().length < 20
    ) {
      newErrors.description =
        "Description must contain at least 20 characters";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await createTask({
        title,
        description,
        status,
      });

      alert(
        "✅ Task Created Successfully"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        "❌ Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">

      <div className="col-lg-8">

        <div className="card card-shadow border-0">

          <div className="card-header bg-dark text-white">

            <h4 className="mb-0">
              Add New Task
            </h4>

          </div>

          <div className="card-body">

            <form
              onSubmit={handleSubmit}
            >

              {/* Title */}

              <div className="mb-3">

                <label className="form-label fw-bold">
                  Task Title
                </label>

                <input
                  type="text"
                  className={`form-control ${
                    errors.title
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                />

                {errors.title && (
                  <div className="invalid-feedback">
                    {errors.title}
                  </div>
                )}

              </div>

              {/* Description */}

              <div className="mb-3">

                <label className="form-label fw-bold">
                  Description
                </label>

                <textarea
                  rows="5"
                  className={`form-control ${
                    errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter task description"
                  value={
                    description
                  }
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                />

                <small className="text-muted">
                  Minimum 20 characters
                </small>

                {errors.description && (
                  <div className="invalid-feedback">
                    {
                      errors.description
                    }
                  </div>
                )}

              </div>

              {/* Status */}

              <div className="mb-4">

                <label className="form-label fw-bold">
                  Status
                </label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value
                    )
                  }
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>
                </select>

              </div>

              {/* Buttons */}

              <div className="d-flex gap-2">

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading
                    ? "Creating..."
                    : "Create Task"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    navigate("/")
                  }
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddTask;