import React, { useCallback, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



import '../styles/Filter.css';


const Filter = ({ filter, setFilter, title, count }) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    const onFilterChange = useCallback(({ target }) => {
        setFilter(target.value);
    }, [])

    return <div className="filter-container">
        <div>
            <h3>{title}<span>{count}</span> </h3>

        </div>
        <Select
        className='filter'
            value={filter}
            onChange={onFilterChange}
            displayEmpty
            renderValue={(selected) => selected || "Filter"}
        >
            <MenuItem value="">
                <em>Filter</em>
            </MenuItem>
            {[...new Set(tasks?.map(task => task.category))].map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
        </Select>
    </div>
};

export default Filter;