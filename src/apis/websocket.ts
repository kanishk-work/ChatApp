import { io } from "socket.io-client";
import { ChatMessage, addMessage } from "../Redux/slices/chatsSlice";
import { Message } from "../Types/message";
import { useAppDispatch } from "../Redux/hooks";

// const socket = io("http://localhost:3000");

export const useWebSocket = () => {
  const dispatch = useAppDispatch();

  // socket.on("message", (message: any) => {
  //   dispatch(addMessage(message));
  // });

  const sendMessage = (message: ChatMessage) => {
    // socket.emit("message", message);
    dispatch(addMessage({ userId: message.senderId, message }));
  };

  return { sendMessage };
};
