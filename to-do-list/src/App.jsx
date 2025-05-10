import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import TaskPage from './pages/TaskPage.jsx';

import './App.css';
import React, { useEffect, useState } from 'react';
import { initialTasks } from './db/index.js';
import RouteLogger from './utils/RouteLogger.jsx';

function App() {

  const [isThemeLight, setIsThemeLight] = useState(true);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : initialTasks;
});

  useEffect(() => {
    const root = document.documentElement;
    if (isThemeLight) {
        root.classList.remove('dark');
    } else {
        root.classList.add('dark');
    }
}, [isThemeLight]);
  return (
    <Router>
      <RouteLogger />
      <Routes>
        <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} isThemeLight={isThemeLight} setIsThemeLight={setIsThemeLight} />} />
        <Route path="/add-task" element={<TaskPage tasks={tasks} setTasks={setTasks} isThemeLight={isThemeLight} setIsThemeLight={setIsThemeLight}/>} />
        <Route path="/edit/:id" element={<TaskPage tasks={tasks} setTasks={setTasks} isThemeLight={isThemeLight} setIsThemeLight={setIsThemeLight}/>} />
      </Routes>
    </Router>
  );
}

export default App;
