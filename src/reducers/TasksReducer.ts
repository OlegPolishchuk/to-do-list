import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {TasksStateType} from "../App";

type tasksReducer =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskTitleType
    | InitTasksListACType
    | ChangeTaskStatusACType

export const tasksReducer = (state: TasksStateType, action: tasksReducer) => {
    switch (action.type) {
        case 'REMOVE-TASK' : {

            const {todoListId, taskId} = action.payload
            return {...state, [todoListId]: state[todoListId].filter(el => el.id !== taskId)}
        }
        case 'ADD-TASK': {
            const todoListId = action.payload.todoListId
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }

            return {...state, [todoListId]: [newTask, ...state[todoListId]]}
        }

        case 'CHANGE-TASK-TITLE' : {
            const {todoListId, taskId, title} = action.payload
            console.log({...state, [todoListId]: state[todoListId].map(el => el.id === taskId ? {...el, title} : el)})
            return {...state, [todoListId]: state[todoListId].map(el => el.id === taskId ? {...el, title} : el)}
        }

        case 'INIT-TASKS-LIST' : {
            debugger
            const todoListId = action.payload.todoLustId
            return {...state, [todoListId]: []}
        }

        case 'CHANGE-TASK-STATUS': {
            const {todoListId, taskId, isDone} = action.payload

            return {...state, [todoListId]: state[todoListId].map(el => el.id === taskId ? {...el, isDone} : el)}
        }

        default:
            return state
    }
}


export type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId,
            taskId
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListId,
            title
        }
    } as const
}

type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoListId,
            taskId,
            title
        }
    } as const
}

type InitTasksListACType = ReturnType<typeof initTasksListAC>

export const initTasksListAC = (todoLustId: string) => {
    return {
        type: 'INIT-TASKS-LIST',
        payload: {
            todoLustId
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListId,
            taskId,
            isDone
        }
    } as const
}


// export const TasksReducer = (state: TaskType[], action: TasksReducersType) => {
//     // action - это объект, у которого обязательно должно быть свойство type
//     switch (action.type) {
//         case 'REMOVE-TASK':
//             return state.filter(el => el.id != action.payload.id);
//         case 'ADD-TASK':
//             return [{id: v1(), title: action.payload.title, isDone: false},...state]
//         default:
//             return state
//     }
// }
//
// // type for all actions
//
// type TasksReducersType = removeTaskACType | addTaskACType
//
// // actions
//
// type removeTaskACType = ReturnType<typeof removeTaskAC>
//
// export const removeTaskAC = (id: string) => {
//     return {
//         type: 'REMOVE-TASK',
//         payload: {
//             id: id
//         }
//     } as const
// }
//
// type addTaskACType = ReturnType<typeof addTaskAC>
//
// export const addTaskAC = (title: string) => {
//     return {
//         type: 'ADD-TASK',
//         payload: {
//             title
//         }
//     } as const
// }