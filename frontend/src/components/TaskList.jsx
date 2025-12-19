import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { getTasks, deleteTask ,updateTask} from "../services/api";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import "../styles/task.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); //loading is current value , setloading is the update value
  const [taskToEdit, setTaskToEdit] = useState(null);

  const loadTasks = async () => {
  try {
    setLoading(true);
    const taskData = await getTasks();
    setTasks(taskData);
  } catch (err) {
    console.error("Failed to load tasks", err);
  } finally {
    setLoading(false);
  }
};
  

  useEffect(() => {  //useEffect (Side Effects) ⏱️Used for:Fetching data Running code on page load Watching changes
    loadTasks();
  }, []);

  const deleteOneTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const editTask = async (id, title) => {
  await updateTask(id, title);
  setTaskToEdit(null);
  loadTasks();
};

  return (
 <div className="task-container">
      <h2 className="task-title">Task Manager</h2>

      <TaskForm onTaskAdded={loadTasks} 
                editTask={editTask}
                taskToEdit={taskToEdit}
  />

      {loading ? (
        <p className="info-text">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="info-text">No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            task={task}//prop parent
         onDelete={deleteOneTask}
         onEdit={setTaskToEdit}
          />
        ))
      )}
    </div>
);
}

export default TaskList;
