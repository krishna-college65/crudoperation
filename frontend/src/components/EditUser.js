import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUser = ({ match }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost:8081/edit/${match.params.id}`
    );
    setName(response.data.name);
    setEmail(response.data.email);
    setPassword(response.data.password);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.put(`http://localhost:8081/update/${match.params.id}`, {
        name,
        email,
        password,
      });
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user", error);
      alert("Failed to update user.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;
