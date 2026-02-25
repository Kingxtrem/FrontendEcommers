import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    isAdmin: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            if (action.payload.user) {
                state.user = action.payload.user;
                state.isAdmin = action.payload.user.isAdmin;
            }
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            state.isAdmin = false;
            localStorage.removeItem('token');
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAdmin = action.payload.isAdmin;
        }
    },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
