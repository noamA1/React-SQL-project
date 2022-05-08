import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageToSend: "",
  messagesArray: [],
};

export const webSocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setNewMessage: (stae, actions) => {
      stae.messageToSend = actions.payload;
    },
    getMessages: (stae, action) => {
      stae.messagesArray.push({
        message: action.payload,
      });
    },
    clearNotifications: () => initialState,
  },
});

export const { sendMessage, getMessages, clearNotifications } =
  webSocketSlice.actions;

export default webSocketSlice.reducer;
