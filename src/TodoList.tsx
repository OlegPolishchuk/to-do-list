import React from "react";
import {TaskType} from "./App";
import TodoListHearer from "./TodoListHearer";
import Button from "./Button";
import TasksList from "./TasksList";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <TodoListHearer title={props.title}/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <TasksList tasks={props.tasks}/>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    );
};

export default TodoList;