import { createSlice } from "@reduxjs/toolkit";

const initialMessageState = {
  message: "",
  username: "",
  isMedia: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.username = action.payload.username;
      state.isMedia = action.payload.isMedia;
    },
    clearMessage: (state) => {
      state.message = "";
      state.username = "";
      state.isMedia = false;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
