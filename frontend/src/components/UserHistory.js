import React, { useState, useEffect } from "react";
import axios from "axios";

function UserHistory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/users")
      .then((response) => {
        console.log("Users fetched successfully:", response.data); // Log the full response to check its structure
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUsers(response.data);
        } else {
          setError("No users found.");
        }
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
        setLoading(false); // Stop loading on error
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8081/delete/${id}`)
        .then((response) => {
          alert(response.data.message);
          setUsers(users.filter((user) => user.id !== id)); // Update state after deletion
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user.");
        });
    }
  };

  const handleEdit = (id) => {
    const name = prompt("Enter new name:");
    const email = prompt("Enter new email:");
    const password = prompt("Enter new password:");

    if (name && email && password) {
      axios
        .put(`http://localhost:8081/update/${id}`, { name, email, password })
        .then((response) => {
          alert(response.data.message);
          setUsers(
            users.map((user) =>
              user.id === id ? { ...user, name, email, password } : user
            )
          );
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          alert("Failed to update user.");
        });
    }
  };

  return (
    <div>
      <h1>User History</h1>
      {loading && <p>Loading users...</p>}{" "}
      {/* Show loading message while fetching */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error message if any */}
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserHistory;
