import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from "../components/Header";
import Main from "../components/Main";
import Filter from "../components/Filter";

import '../styles/Home.css';

const Home = ( {tasks, setTasks, isThemeLight, setIsThemeLight}) => {
    const [filter, setFilter] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        return filter ? tasks.filter((task) => task.category === filter) : tasks;
    }, [tasks, filter])

    const complitedTasks = useMemo(() => tasks.reduce((complited, task) => {
        if (task.progress === 100 ) complited++;
        return complited
    }, 0), [tasks]);

    const inProgressTasks = useMemo(() => tasks.length - complitedTasks, [tasks.length, complitedTasks]);
    const onAddNewTask = useCallback(() => {
        navigate('/add-task');
    },[])

    return (
        <div>
            <Header setIsThemeLight={setIsThemeLight} isThemeLight={isThemeLight} />
            <Filter filter={filter} setFilter={setFilter} title="In Progress " count={inProgressTasks}/>
            <Main setTasks={setTasks} tasks={filteredTasks} isThemeLight={isThemeLight} />
            <Filter filter={filter} setFilter={setFilter} title="Complited " count={complitedTasks}/>
            <div>
                <button className='new-task-btn' onClick={onAddNewTask}>
                    + New Task
                </button>
            </div>
        </div>
    );
};

export default Home;