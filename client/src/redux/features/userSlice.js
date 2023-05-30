import { createSlice } from "@reduxjs/toolkit";
import { BOT, DEFAULT_BOT_MESSAGE } from "../../config/constants";

const anonymousUser = {
  username: "user",
  chatlog: [
    {
      role: BOT,
      content: DEFAULT_BOT_MESSAGE,
      isMedia: false,
    },
  ],
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: anonymousUser,
  reducers: {
    login: (state, action) => {
      state.role = action.payload.role;
      state._id = action.payload._id;
      state.chatlog = action.payload.chatlog;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      return anonymousUser;
    },
    updateChatlog: (state, action) => {
      state.chatlog = action.payload;
    },
    setIsLoggingIn: (state, action) => {
      state.isLoggingIn = action.payload;
    },
    setToAnonymous: (state) => {
      state = anonymousUser;
    },
  },
});

export const { login, logout, updateChatlog, setIsLoggingIn, setToAnonymous } =
  userSlice.actions;

export default userSlice.reducer;
