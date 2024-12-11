import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: string;
  type: string;
  title: string;
}

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [], 
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
 
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },

    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { setItems, addItem, removeItem, updateItem, clearItems } = itemsSlice.actions;

export default itemsSlice.reducer;
