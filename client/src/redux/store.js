import { configureStore } from "@reduxjs/toolkit";
// import { chatlogMiddleware } from "./middleware/chatlogMiddleware";
import rootReducer from "./rootReducer";
// import { createLogger } from "redux-logger";

// const logger = createLogger();

const store = configureStore({
  reducer: rootReducer,
  // middleware: [logger, chatlogMiddleware],
});

export default store;
