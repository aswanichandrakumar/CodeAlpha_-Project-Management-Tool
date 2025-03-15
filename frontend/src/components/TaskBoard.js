import React, { useEffect, useState } from "react";
import { getTasks, updateTaskStatus } from "./api"; // Import API functions

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      if (data) {
        setTasks({
          todo: data.filter((task) => task.status === "To Do"),
          inProgress: data.filter((task) => task.status === "In Progress"),
          completed: data.filter((task) => task.status === "Completed"),
        });
      }
    };
    fetchTasks();
  }, []);

  const moveTask = async (taskId, newStatus) => {
    const response = await updateTaskStatus(taskId, newStatus);
    if (response.success) {
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        const taskToMove = [...updatedTasks.todo, ...updatedTasks.inProgress, ...updatedTasks.completed].find(
          (task) => task._id === taskId
        );

        if (taskToMove) {
          taskToMove.status = newStatus;
          updatedTasks.todo = updatedTasks.todo.filter((t) => t._id !== taskId);
          updatedTasks.inProgress = updatedTasks.inProgress.filter((t) => t._id !== taskId);
          updatedTasks.completed = updatedTasks.completed.filter((t) => t._id !== taskId);
          updatedTasks[newStatus.toLowerCase().replace(" ", "")].push(taskToMove);
        }
        return updatedTasks;
      });
    }
  };

  return (
    <div className="task-board">
      {["To Do", "In Progress", "Completed"].map((status) => (
        <div key={status} className="task-column">
          <h3>{status}</h3>
          {tasks[status.toLowerCase().replace(" ", "")].map((task) => (
            <div key={task._id} className="task-card">
              <p>{task.title}</p>
              {status !== "Completed" && (
                <button onClick={() => moveTask(task._id, status === "To Do" ? "In Progress" : "Completed")}>
                  Move to {status === "To Do" ? "In Progress" : "Completed"}
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
