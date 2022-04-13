import {FilterValuesType, TodolistType} from "../App";

type TodoLustReducerType =
    AddTodoListACType
    | RemoveTodoListACType
    | ChangeTodoListTitleACType
    | ChangeTodoListFilterACType

export const todoListReducer = (state: TodolistType[], action: TodoLustReducerType) => {
    switch (action.type) {

        case 'ADD-TODOLIST': {
            const newTodoList: TodolistType = {
                id: action.payload.todoListId,
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
            return state.map(el => el.id === todoListId ? {...el, title: newTitle} : el)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const {todoListId, filter} = action.payload
            return state.map(el => el.id === todoListId ? {...el, filter} : el)
        }

        default:
            return state
    }
}

type AddTodoListACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (todoListId: string, title: string) => {
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

type ChangeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId,
            filter
        }
    } as const
}


