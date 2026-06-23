const Task = require("../models/taskModel");

const getTasks = (req, res) => {

    Task.getAllTasks((err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(200).json(result);
    });
};

const createTask = (req, res) => {

    const { title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (description.length < 20) {
        return res.status(400).json({
            message: "Description minimum 20 characters"
        });
    }

    Task.createTask(
        { title, description, status },
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "Task Created"
            });
        }
    );
};

const updateTask = (req, res) => {

    const id = req.params.id;

    const { status } = req.body;

    Task.updateTaskStatus(
        id,
        status,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Task Updated"
            });
        }
    );
};

const deleteTask = (req, res) => {

    const id = req.params.id;

    Task.deleteTask(
        id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Task Deleted"
            });
        }
    );
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};