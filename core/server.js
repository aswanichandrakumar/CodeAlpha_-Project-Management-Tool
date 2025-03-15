const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);

// WebSocket for real-time updates
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinProject", (projectId) => {
        socket.join(projectId);
        console.log(`User joined project: ${projectId}`);
    });

    socket.on("newTask", (task) => {
        io.to(task.projectId).emit("taskCreated", task);
    });

    socket.on("updateTask", (task) => {
        io.to(task.projectId).emit("taskUpdated", task);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
