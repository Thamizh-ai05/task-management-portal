const db = require("../config/db");

const getAllTasks = (callback) => {
    db.query("SELECT * FROM tasks ORDER BY created_at DESC", callback);
};

const createTask = (task, callback) => {
    const sql =
        "INSERT INTO tasks(title, description, status) VALUES (?, ?, ?)";

    db.query(
        sql,
        [task.title, task.description, task.status],
        callback
    );
};

const updateTaskStatus = (id, status, callback) => {
    const sql =
        "UPDATE tasks SET status=? WHERE id=?";

    db.query(sql, [status, id], callback);
};

const deleteTask = (id, callback) => {
    db.query(
        "DELETE FROM tasks WHERE id=?",
        [id],
        callback
    );
};

module.exports = {
    getAllTasks,
    createTask,
    updateTaskStatus,
    deleteTask
};