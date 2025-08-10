import type { AuthState } from "../../types/auth";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
    // user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
     isAuthenticated: false,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; user: { id: string; email: string; role: "user" | "admin"; name: string } }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
             state.isAuthenticated = false;
        },
    },

})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;