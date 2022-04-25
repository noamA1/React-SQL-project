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
    signIn: (state, action) => {
      state.isSignIn = !state.isSignIn;
      state.userInfo = {
        firstName: action.payload.userInfo.firstName,
        lastName: action.payload.userInfo.lastName,
        email: action.payload.userInfo.email,
      };
      state.fullName = `${state.userInfo.firstName} ${state.userInfo.lastName}`;
      state.userId = action.payload.userInfo.id;
    },
    signOut: () => initialState,
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
