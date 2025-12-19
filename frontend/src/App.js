import React from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import TaskList from "./components/TaskList";
import "./styles/task.css";


function App() {
  return (
    <div className="app-container">
      
      <TaskList />
    </div>
  );
}

export default App;
