import { createSlice } from "@reduxjs/toolkit";

const initialAppState = {
  isLoading: false,
  chatlog: [],
  hasError: false,
  errorMessage: "",
  isMenuOpen: false,
  username: "",
  password: "",
  setPasswordVisible: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addMessageToChatlog: (state, action) => {
      state.chatlog.push(action.payload);
    },
    clearChatlog: (state) => {
      state.chatlog = [];
    },
    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordVisible: (state, action) => {
      state.passwordVisibile = action.payload;
    },
  },
});

export const {
  setIsLoading,
  addMessageToChatlog,
  clearChatlog,
  setHasError,
  setErrorMessage,
  setIsMenuOpen,
  setUsername,
  setPassword,
  setPasswordVisible,
} = appSlice.actions;

export default appSlice.reducer;
