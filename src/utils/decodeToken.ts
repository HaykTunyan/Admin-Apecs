// Descode Token

import { jwtDecode } from "jwt-decode";
import { setDecodedToken} from "@/store/slices/tokenSlice";
import { AppDispatch } from "@/store/store";

export const decodeAndSaveToken = (token: string, dispatch: AppDispatch) => {
  try {
    const decoded = jwtDecode<any>(token);
    //@ts-ignore
    dispatch(setDecodedToken(decoded));
  } catch (error) {
  }
};
