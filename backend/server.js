const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = 8081;

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "crud", // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Stop the server if DB connection fails
  }
  console.log("Connected to MySQL");
});

// Add user (Create)
app.post("/add", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "INSERT INTO student (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error("Error adding data:", err);
      return res.status(500).json({ error: "Failed to add data" });
    }
    res.status(201).json({ message: "Data added successfully" });
  });
});

// Get all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM student";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Error fetching users" });
    }

    res.json(results);
  });
});

// Edit user - Get user details based on ID
app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM student WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user details:", err);
      return res.status(500).json({ message: "Error fetching user details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]);
  });
});

// Update user - Put request to update user data
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "UPDATE student SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(query, [name, email, password, id], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ message: "Failed to update user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  });
});

// Delete user - Delete request to remove a user based on ID
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM student WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Failed to delete user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save files in the "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Add unique timestamp
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|gif/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = fileTypes.test(file.mimetype);

//     if (extname && mimetype) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only images (jpeg, jpg, png, gif) are allowed"));
//     }
//   },
// });

// // Routes
// app.post("/upload", upload.single("image"), (req, res) => {
//   const file = req.file;
//   const description = req.body.description;

//   if (!file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const query = "INSERT INTO images (filename, filepath, description) VALUES (?, ?, ?)";
//   db.query(query, [file.filename, file.path, description], (err, result) => {
//     if (err) {
//       console.error("Error saving file info:", err);
//       return res.status(500).json({ error: "Failed to save file info" });
//     }
//     res.status(200).json({
//       message: "File uploaded successfully",
//       file: {
//         filename: file.filename,
//         filepath: `/uploads/${file.filename}`,
//       },
//     });
//   });
// });

// // Retrieve all uploaded images
// app.get("/images", (req, res) => {
//   const query = "SELECT * FROM images ORDER BY uploaded_at DESC";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching images:", err);
//       return res.status(500).json({ error: "Failed to fetch images" });
//     }
//     res.status(200).json(results);
//   });
// });

// Start the Server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
