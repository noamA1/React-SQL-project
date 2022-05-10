import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  messageToSend: "",
  messagesArray: [],
};

export const notifications = createSlice({
  name: "socket",
  initialState,
  reducers: {
    // setNewMessage: (stae, actions) => {
    //   stae.messageToSend = actions.payload;
    // },
    addNotification: (state, action) => {
      state.messagesArray.push({
        message: action.payload.message,
        timeStemp: action.payload.time,
      });
    },
    clearNotifications: () => initialState,
  },
});

export const { addNotification, clearNotifications } = notifications.actions;

export default notifications.reducer;
