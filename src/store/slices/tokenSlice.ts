// redux/slices/tokenSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DecodedToken {
  id: string;
  full_name: string;
  username: string;
  email: string;
  permissions: string[];
  iat: number;
  exp: number;
}

interface TokenState {
  decodedToken: DecodedToken | null;
}

const initialState: TokenState = {
  decodedToken: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setDecodedToken(state, action: PayloadAction<DecodedToken>) {
      state.decodedToken = action.payload;
    },
    clearDecodedToken(state) {
      state.decodedToken = null;
    },
  },
});

export const { setDecodedToken, clearDecodedToken } = tokenSlice.actions;
export default tokenSlice.reducer;
