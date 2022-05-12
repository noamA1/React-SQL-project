import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSignIn: false,
  fullName: "",
  userInfo: {},
  userId: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateInfo: (state, action) => {
      state.userInfo = {
        id: action.payload.userInfo.id,
        firstName: action.payload.userInfo.firstName,
        lastName: action.payload.userInfo.lastName,
        email: action.payload.userInfo.email,
      };
      state.fullName = `${state.userInfo.firstName} ${state.userInfo.lastName}`;
    },
    signIn: (state, action) => {
      state.isSignIn = true;
      state.userInfo = {
        id: action.payload.userInfo.id,
        firstName: action.payload.userInfo.firstName,
        lastName: action.payload.userInfo.lastName,
        email: action.payload.userInfo.email,
      };
      state.fullName = `${state.userInfo.firstName} ${state.userInfo.lastName}`;
      state.userId = action.payload.userInfo.id;
      state.token = action.payload.token;
    },

    signOut: () => initialState,
  },
});

export const { signIn, signOut, updateInfo } = userSlice.actions;

export default userSlice.reducer;
