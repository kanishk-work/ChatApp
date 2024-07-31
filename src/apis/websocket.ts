import { io } from "socket.io-client";
import { addMessage } from "../redux/slices/chatsSlice";
import { Message } from "../types/message";
import { useAppDispatch } from "../redux/hooks";

// const socket = io("http://localhost:3000");

export const useWebSocket = () => {
  const dispatch = useAppDispatch();

  // socket.on("message", (message: any) => {
  //   dispatch(addMessage(message));
  // });

  const sendMessage = (message: Message) => {
    // socket.emit("message", message);
    dispatch(addMessage({ chatId: message.chatId, message }));
  };

  return { sendMessage };
};
