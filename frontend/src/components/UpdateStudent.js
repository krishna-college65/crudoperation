// src/components/UpdateStudent.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateStudent() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Fetch the current data of the student when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:8081/users/${id}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle form submission to update user data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/update/${id}`, userData)
      .then((response) => {
        alert(response.data.message);
        navigate("/user-history"); // Use navigate instead of history.push
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div>
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateStudent;
