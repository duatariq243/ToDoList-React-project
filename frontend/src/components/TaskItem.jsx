import React from "react";
import "../styles/task.css";

function TaskItem({ task, onDelete, onEdit }) {
  return (
    <div className="task-card">
      <span>{task.title}</span>
      <div>
        <button className="edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}


export default TaskItem;
