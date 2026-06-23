import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = () => {
    return axios.get(`${API_URL}/tasks`);
};

export const createTask = (task) => {
    return axios.post(`${API_URL}/tasks`, task);
};

export const updateTask = (id, status) => {
    return axios.put(`${API_URL}/tasks/${id}`, {
        status
    });
};

export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/tasks/${id}`);
};