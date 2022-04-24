import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
