import axios from "axios";

const API_URL = "http://localhost:8081"; // Replace with your backend URL

// Create a new user
export const createUser = (data) => {
  return axios.post(`${API_URL}/add`, data);
};

// Delete a user by ID
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
};

// Update a user by ID
export const updateUser = (id, data) => {
  return axios.put(`${API_URL}/update/${id}`, data);
};
