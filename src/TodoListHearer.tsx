import React from 'react';

type TodoListHearerPropsType = {
    title: string
}

const TodoListHearer = (props: TodoListHearerPropsType) => {
    return (
        <h3>{props.title}</h3>
    );
};

export default TodoListHearer;