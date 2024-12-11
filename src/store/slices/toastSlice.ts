import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ToastState {
    isOpen: boolean;
    title: string;
    message: string;
    type: string;
}

const initialState: ToastState = {
    isOpen: false,
    title: "",
    message: "",
    type: "success",
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast(state, action: PayloadAction<{ title: string; message: string; type: string }>) {
            state.isOpen = true;
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideToast(state) {
            state.isOpen = false;
        },
    },
});

export const {showToast, hideToast} = toastSlice.actions;

export default toastSlice.reducer;
