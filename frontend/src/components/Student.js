import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Student() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim inputs and validate
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    axios
      .post("http://localhost:8081/add", userData)
      .then((response) => {
        alert(response.data.message);
        navigate("/user-history"); // Redirect after successful submission
      })
      .catch((error) => {
        console.error("Error adding user:", error.response || error);
        alert(
          error.response?.data?.error || "Failed to add user. Please try again."
        );
      });
  };

  return (
    <div>
      <h1>Submit Student Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Student;
// im learning about git 