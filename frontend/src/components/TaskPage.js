import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById, updateTaskStatus, addComment } from "./api";

const TaskPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      const data = await getTaskById(taskId);
      if (data) {
        setTask(data);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleStatusChange = async (newStatus) => {
    const response = await updateTaskStatus(taskId, newStatus);
    if (response.success) {
      setTask({ ...task, status: newStatus });
    }
  };

  const handleAddComment = async () => {
    if (comment.trim() === "") return;
    const response = await addComment(taskId, comment);
    if (response.success) {
      setTask({ ...task, comments: [...task.comments, response.comment] });
      setComment("");
    }
  };

  if (!task) return <p>Loading task...</p>;

  return (
    <div className="task-page">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: <strong>{task.status}</strong></p>

      <div className="status-buttons">
        {task.status !== "Completed" && (
          <button onClick={() => handleStatusChange("Completed")}>Mark as Completed</button>
        )}
        {task.status === "To Do" && (
          <button onClick={() => handleStatusChange("In Progress")}>Move to In Progress</button>
        )}
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {task.comments.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default TaskPage;
