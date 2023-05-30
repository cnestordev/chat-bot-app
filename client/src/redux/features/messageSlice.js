import { createSlice } from "@reduxjs/toolkit";

const initialMessageState = {
  content: "",
  role: "",
  isMedia: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    setMessage: (state, action) => {
      state.content = action.payload.content;
      state.role = action.payload.role;
      state.isMedia = action.payload.isMedia;
    },
    clearMessage: (state) => {
      state.content = "";
      state.role = "";
      state.isMedia = false;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
