import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    initTasksListAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/TasksReducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC,
    todoListReducer
} from "./reducers/TodoListReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    // let newTodoListId = v1();

    let [todolists, todoListsDispatch] = useReducer(todoListReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        tasksDispatch(removeTaskAC(todolistId, id))
    }

    function addTask(title: string, todolistId: string) {
        tasksDispatch(addTaskAC(todolistId, title))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        todoListsDispatch(changeTodoListFilterAC(todolistId, value))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {

        tasksDispatch(changeTaskStatusAC(todolistId, id, isDone))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        tasksDispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }

    function removeTodolist(id: string) {
        todoListsDispatch(removeTodolistAC(id))
    }

    function changeTodolistTitle(id: string, title: string) {
        todoListsDispatch(changeTodoListTitleAC(id, title))
    }


    function addTodolist(title: string) {

        // ПОМОЩЬ МЕНТОРА !!!
        debugger
        const newTodoListId = v1()
        todoListsDispatch(addTodoListAC(newTodoListId, title))
        tasksDispatch(initTasksListAC(newTodoListId))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
