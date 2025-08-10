


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
    id: string;
    title: string;
    desc: string;
    status: 'todo' | 'in-progress' | 'on-hold' | 'done' | 'will-not-do';
    priority: 'low' | 'medium' | 'high' | 'critical';
    expected_completion: string;
    user_id: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}

export interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
       
        fetchTodosStart: (state) => {
            state.loading = true;
            state.error = null;
        },

      
        fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
            state.loading = false;
            state.todos = action.payload;
        },

        
        fetchTodosFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

     
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },

        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },

        updateTodo: (state, action: PayloadAction<Todo>) => {
            const updatedTodo = action.payload;
            const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                state.todos[index] = updatedTodo;
            }
        },
    },
});

export const { fetchTodosStart, fetchTodosSuccess, fetchTodosFailure, addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;