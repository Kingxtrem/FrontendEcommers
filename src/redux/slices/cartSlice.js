import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        increaseQuantity: (state, action) => {
            const item = state.items.find((i) => i.product_id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find((i) => i.product_id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((i) => i.product_id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
});

export const { setCart, setLoading, increaseQuantity, decreaseQuantity, removeItem, clearCart } = cartSlice.actions;

export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;

