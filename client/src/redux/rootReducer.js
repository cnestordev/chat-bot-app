import { combineReducers } from "@reduxjs/toolkit";
import userReducer, {
  login,
  logout,
  updateChatlog,
  setToAnonymous,
} from "./features/userSlice";
import appReducer, {
  setIsLoading,
  addMessageToChatlog,
  clearChatlog,
  setHasError,
  setErrorMessage,
  setIsMenuOpen,
  setUsername,
  setPassword,
  setPasswordVisible,
} from "./features/appSlice";

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});

export const activeUser = (state) => state.user;

export {
  login,
  logout,
  updateChatlog,
  setToAnonymous,
  setIsLoading,
  addMessageToChatlog,
  clearChatlog,
  setHasError,
  setErrorMessage,
  setIsMenuOpen,
  setUsername,
  setPassword,
  setPasswordVisible,
};
export default rootReducer;
