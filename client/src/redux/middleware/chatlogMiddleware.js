import axios from "axios";
import { updateChatlog } from "../rootReducer";

export const chatlogMiddleware = (store) => (next) => async (action) => {
  const result = next(action);
  if (action.type === updateChatlog.type) {
    const { user } = store.getState();
    if (user && user._id) {
      try {
        await axios.put(`/user/${user._id}/updatechatlog`, {
          chatlog: action.payload,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
  return result;
};
