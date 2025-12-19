import React, { useState , useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { addTask } from "../services/api"; // note name
import "../styles/task.css";

function TaskForm({ onTaskAdded, editTask, taskToEdit }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setText(taskToEdit.title);
    }
  }, [taskToEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    if (taskToEdit) {
      await editTask(taskToEdit.id, text);
    } else {
      await addTask(text);
    }

    setText("");
    onTaskAdded();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
      />
      <button className="add-btn">
        {taskToEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}


export default TaskForm;
