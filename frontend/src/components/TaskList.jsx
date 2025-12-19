import React, { useState, useEffect } from "react";
import { getTasks, deleteTask ,updateTask} from "../services/api";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import "../styles/task.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
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
  

  useEffect(() => {
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
            task={task}
         onDelete={deleteOneTask}
         onEdit={setTaskToEdit}
          />
        ))
      )}
    </div>
);
}

export default TaskList;
