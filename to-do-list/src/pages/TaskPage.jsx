import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import '../styles/TaskPage.css';
import { inputStyles } from '../styles/inputStyles';

const TaskPage = ({ tasks, setTasks, isThemeLight, setIsThemeLight }) => {
    const navigator = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const taskToEdit = isEdit ? tasks.find(task => task.id === Number(id)) : null;

    const [category, setCategory] = useState('');
    const [taskName, setTaskname] = useState('');
    const [subtasks, setSubtasks] = useState([]);

    useEffect(() => {
        if (isEdit && taskToEdit) {
            setCategory(taskToEdit.category || '');
            setTaskname(taskToEdit.title || '');
            setSubtasks(taskToEdit.subtasks || []);
        }
    }, [isEdit, taskToEdit]);

    const onSelectChange = useCallback(({ target }) => {
        setCategory(target.value);
    }, []);

    const handleTaskNameChange = useCallback(({ target }) => {
        setTaskname(target.value);
    }, []);

    const handleSubtaskChange = useCallback((index, value) => {
        setSubtasks(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], value };
            return updated;
        });
    }, []);

    const toggleSubtaskCompleted = useCallback((index) => {
        setSubtasks(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                completed: !updated[index].completed
            };
            return updated;
        });
    }, []);

    const calculateProgress = (subtasks) => {
        if (subtasks.length === 0) return 0;
        const completedCount = subtasks.filter(st => st.completed).length;
        return Math.round((completedCount / subtasks.length) * 100);
    };

    const addNewSubtaskInput = useCallback(() => {
        setSubtasks(prev => [...prev, { value: '', completed: false }]);
    }, []);

    const onSubmit = useCallback(() => {
        const filteredSubtasks = subtasks.filter((t) => t.value.trim() !== '');

        if (!category || !taskName) {
            alert("Please fill in category and task name");
            return;
        }

        const progress = calculateProgress(filteredSubtasks);

        if (isEdit && taskToEdit) {
            const updatedTasks = tasks.map(task =>
                task.id === taskToEdit.id
                    ? { ...task, category, title: taskName, subtasks: filteredSubtasks, progress }
                    : task
            );
            setTasks(updatedTasks);
        } else {
            const newTask = {
                id: tasks.length + 1,
                category,
                title: taskName,
                progress,
                subtasks: filteredSubtasks
            };
            setTasks([...tasks, newTask]);
        }

        navigator('/');
    }, [isEdit, taskToEdit, tasks, category, taskName, subtasks, setTasks, navigator]);

    return (
        <div>
            <Header isThemeLight={isThemeLight} setIsThemeLight={setIsThemeLight} />

            <div className='back' onClick={() => navigator('/')}>
                <img src='/img/back.svg' alt='back' />
                <p>Back</p>
            </div>

            <div className='add-task-main'>
                <p className='add-title'>{isEdit ? 'Edit Task' : 'Create New Task'}</p>

                <Select
                    className='select-category'
                    value={category}
                    onChange={onSelectChange}
                    displayEmpty
                    renderValue={(selected) => selected ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img
                                className="tag"
                                src={`/img/${selected}-tag.svg`}
                                alt='tag'
                                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                            />
                            {selected}
                        </div>
                    ) : "Select Category"}
                >
                    <MenuItem value="">
                        <em>Select Category</em>
                    </MenuItem>
                    {[...new Set(tasks?.map(task => task.category))].map(cat => (
                        <MenuItem key={cat} value={cat}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img
                                    className="tag"
                                    src={`/img/${cat}-tag.svg`}
                                    alt='tag'
                                    style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                                />
                                {cat}
                            </div>
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    className='input'
                    value={taskName}
                    onChange={handleTaskNameChange}
                    id="input"
                    label="Name your task"
                    variant='outlined'
                    sx={inputStyles}
                />

                <div>
                    <button className='new-subtask-btn' onClick={addNewSubtaskInput}>
                        + Add Sub tasks
                    </button>
                </div>
                <div className='subtask-container'>
                    {subtasks.map((subtask, index) => (
                        <div key={index} className='subtask'>
                            <img
                                className="checkbox"
                                src={subtask.completed ? '/img/checkbox-check.svg' : '/img/checkbox.svg'}
                                alt='checkbox'
                                onClick={() => toggleSubtaskCompleted(index)}
                                style={{
                                    cursor: 'pointer',
                                    'marginTop': '15px',
                                    'marginRight': '15px'
                                }}
                            />
                            <TextField
                                className='input'
                                id={`subtask-${index}`}
                                label={`Sub Task ${index + 1}`}
                                value={subtask.value}
                                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                                variant='outlined'
                                sx={inputStyles}
                            />
                        </div>
                    ))}
                </div>

                <button className='new-task-btn' onClick={onSubmit}>
                    {isEdit ? 'Save Changes' : 'Save New Task'}
                </button>
            </div>
        </div >
    );
};

export default TaskPage;
