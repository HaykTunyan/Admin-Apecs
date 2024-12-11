// store.ts
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import permissionReducer from "./slices/permissionSlice";
import itemsReducer from "./slices/jobsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import toastSlice from "@/store/slices/toastSlice";

const persistConfig = {
  key: "permission",
  storage,
};

const persistToken = {
  key: "token",
  storage,
};

const persistJob = {
  key: "job",
  storage,
};

const persistedTokenReducer = persistReducer(persistToken, tokenReducer);
const persistedPermissionReducer = persistReducer(
  persistConfig,
  permissionReducer
);

const persistedJobReducer = persistReducer(persistJob, itemsReducer);

export const store = configureStore({
  reducer: {
    token: persistedTokenReducer,
    permission: persistedPermissionReducer,
    job: persistedJobReducer,
    toast: toastSlice
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
