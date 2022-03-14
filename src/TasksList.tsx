import React from 'react';
import {TaskType} from "./App";

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id:string) => void
}

const TasksList: React.FC<TaskListPropsType> = (props) => {
    // const tasks = props.tasks;
    const {tasks, removeTask} = props;
    // Создаем новый массив и присваеваем переменной
    const tasksJSXElements = tasks.map((el,i) => {
        return(
            <li key={el.id}>
                <input type={'checkbox'} checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={()=> removeTask(el.id)}>Delete</button>
            </li>
        )
    })

    return (
        // выводим наш новый массив
        // в дальнейшем  будем использовать нвоый массив вместо оригинального, чтобы не изменять последний
        <ul>
            {tasksJSXElements}
        </ul>
    )
};

export default TasksList;