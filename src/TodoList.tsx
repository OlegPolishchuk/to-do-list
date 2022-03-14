import React, {useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import TodoListHearer from "./TodoListHearer";
import Button from "./Button";
import TasksList from "./TasksList";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('');
    const onClickBtnHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressAddTask = (key: string) => {
        if (key === 'Enter') {
            onClickBtnHandler()
        }
    }

    return (
        <div>
            <TodoListHearer title={props.title}/>
            <div>
                <input
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                    onKeyPress={(event) => {onKeyPressAddTask(event.key)}}
                />
                <button onClick={() => onClickBtnHandler()}>+</button>
            </div>
            <TasksList tasks={props.tasks} removeTask={props.removeTask}/>
            <div>
                <Button onClickHandler={() => props.changeFilter('all')} title={'All'}/>
                <Button onClickHandler={() => props.changeFilter('active')} title={'Active'}/>
                <Button onClickHandler={() => props.changeFilter('completed')} title={'Completed'}/>
            </div>
        </div>
    );
};

export default TodoList;