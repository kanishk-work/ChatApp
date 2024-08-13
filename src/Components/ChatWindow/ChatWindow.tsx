import React, { useEffect, useRef, useState } from "react";
// import { useWebSocket } from "../../apis/websocket";
import { RootState } from "../../Redux/store";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "./MessageComposer";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import StatusBar from "./StatusBar";
import { ChatMessage, addMessage } from "../../Redux/slices/chatsSlice";
import { formatTime } from "../../Utils/formatTimeStamp";
import { useSendMessageMutation } from "../../apis/chatApi"; // Import the hook
import useSocket from "../../apis/websocket";

const ChatWindow: React.FC = () => {
  // const { sendMessage } = useWebSocket();
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentChatId = useAppSelector(
    (state: RootState) => state.chats.activeChat
  );
  const chats = useAppSelector((state: RootState) => state.chats.conversations);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const currentUserId = useAppSelector(
    (state: RootState) => state.chats.currentUserId
  );
  const messages = currentChatId !== null ? chats[currentChatId] || [] : [];
  const [sendMessageApi] = useSendMessageMutation();
  const { sendMessage } = useSocket(import.meta.env.VITE_HOST_URL);
  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (textMessage: string, file: string[] | null) => {
    if (currentChatId !== null) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        senderId: currentUserId,
        textMessage,
        file,
        timestamp: new Date().toString(),
      };

      dispatch(addMessage({ userId: currentChatId, message: newMessage }));

      try {
        const result = await sendMessageApi({
          receiver_id: 1,
          message: textMessage,
          chat_room_id: 13,
          files_list: file || [],
        }).unwrap();
        sendMessage(newMessage);
        console.log({ result });
      } catch (error) {
        console.error("Failed to send message: ", error);
      }
    }
  };
  return (
    <div
      className="flex flex-col h-full"
      onClick={() => setShowEmojiPicker(false)}
    >
      <StatusBar
        statusBarStyles={{
          container: { backgroundColor: "", borderRadius: "1rem" },
          activityStatus: { color: "#27AE60" },
        }}
      />
      <div className="flex-1 overflow-auto p-4 scrollbar-custom">
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble
              message={{ textMessage: message.textMessage, file: message.file }}
              sender={message.senderId === currentUserId ? "user" : "other"}
            />
            <div className="text-center text-xs text-gray-500 my-2">
              {formatTime(message.timestamp)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4">
        <MessageComposer
          onSend={handleSend}
          messageComposerStyle={{ backgroundColor: "#CED9E4" }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
