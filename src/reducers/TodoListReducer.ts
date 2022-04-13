import {TodolistType} from "../App";
import {v1} from "uuid";
import {addTaskAC} from "./TasksReducer";

type TodoLustReducerType = AddTodoListACType | RemoveTodoListACType | ChangeTodoListTitleACType

export const todoListReducer = (state: TodolistType[],action: TodoLustReducerType) => {
    switch (action.type) {

        case 'ADD-TODOLIST': {
            const newTodoList: TodolistType = {
                id: v1(),
                filter: 'all',
                title: action.payload.title
            }
            return [newTodoList, ...state]
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoListId)
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const {todoListId, newTitle} = action.payload
            return state.map(el => el.id === todoListId ? {...el, title: newTitle}: el)
        }

        default: return state
    }
}

type AddTodoListACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (todoListId: string,title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todoListId,
            title
        }
    } as const
}

type RemoveTodoListACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId
        }
    } as const
}

type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>

export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListId,
            newTitle
        }
    } as const
}


