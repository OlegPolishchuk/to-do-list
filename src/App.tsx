import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    //C - create
    //R - read
    //U - update
    //D - delete

    //BLL:
    const todoListTitle_1: string = 'What to learn' ;
        // useState !!!
    const [tasks, setTasks] = useState(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS/ES6', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    ) ;
    const [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (id:string) => {
        const filterTasks = tasks.filter(el => el.id !== id)
        setTasks(filterTasks)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        };

        setTasks([newTask, ...tasks]);
    }

    let tasksForTodoList;
    switch (filter) {
        case 'active':
            tasksForTodoList = tasks.filter(el => !el.isDone)
            break
        case  'completed':
            tasksForTodoList = tasks.filter(el => el.isDone)
            break
        default:
            tasksForTodoList = tasks
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    //UI:
    return (
        <div className="App">
            <TodoList
                addTask={addTask}
                title={todoListTitle_1}
                tasks = {tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
