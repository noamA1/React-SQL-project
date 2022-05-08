import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.js";
import webSocketReducer from "./webSocket.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    webSocket: webSocketReducer,
  },
});
