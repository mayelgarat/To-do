import Task from "./Task";


const Main = ({setTasks, tasks, isThemeLight }) => {

    return <div>
        {tasks?.map((task, i) => {
            return  <Task task={task} setTasks={setTasks} tasks={tasks} isThemeLight={isThemeLight} key={i}/>
        })}
    </div>
   
};

export default Main;