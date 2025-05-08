import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import '../styles/Task.css';
import 'react-circular-progressbar/dist/styles.css';

const Task = ({ task: currentTask, setTasks, tasks, isThemeLight}) => {

    const navigate = useNavigate();

    const onDeleteTask = useCallback(() => {
        const newTasks = tasks.filter((task) => task.id !== currentTask.id);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);

    }, [tasks, currentTask.id]);


    const onCheckboxClick = useCallback(() => {
        const newTasks = tasks.map((currTask) => {
            if (currTask.id === currentTask.id) {
                return { ...currTask, progress: 100 };
            }
            return currTask;
        });

        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setTasks(newTasks);
    }, [tasks, currentTask.id]);

    const textColor = useMemo(() => isThemeLight ? "black" : "white", [isThemeLight]);

    const onEditTask = useCallback(() => {
            navigate(`/edit/${currentTask.id}`);
    }, []);

    return <div className="task">
        <div className='left'>

            <div onClick={onCheckboxClick}>{currentTask.progress === 100 ?

                <img className="checkbox" src={`img/checkbox-check.svg`} alt='checkbox' /> : <img className="checkbox" src={`img/checkbox.svg`} alt='checkbox' />}</div>

            <img className="tag" src={`img/${currentTask.category}-tag.svg`} alt='tag' />
            <div className="details">
                <p className="category">{currentTask.category}</p>
                <p className="title">{currentTask.title}</p>
            </div>
        </div>
        <div className='progress' style={{ width: 40, height: 40 }}>
            <CircularProgressbar
                value={currentTask.progress}
                text={`${currentTask.progress}%`}
                styles={buildStyles({
                    pathColor: "#e87d34",     
                    trailColor: "#f2dfce",    
                    textColor,       
                    textSize: '22px',
                    backgroundColor: 'transparent',
                })}
            />
        </div>
        <div className='action-btns'>
            <img className='edit' src="/img/edit.svg" alt="edit" onClick={onEditTask} />
            <img className='delete' src="/img/delete.svg" alt="edit" onClick={onDeleteTask} />
        </div>

    </div>
};

export default Task;