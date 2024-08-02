import React, { useEffect } from "react";
import { useWebSocket } from "../../apis/websocket";
import { RootState } from "../../Redux/store";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "./MessageComposer";
import { useAppSelector } from "../../Redux/hooks";
import StatusBar from "./StatusBar";
import { ChatMessage } from "../../Redux/slices/chatsSlice";

const ChatWindow: React.FC = () => {
  const { sendMessage } = useWebSocket();
  const currentChatId = useAppSelector(
    (state: RootState) => state.chats.activeChat
  );
  const chats = useAppSelector((state: RootState) => state.chats.conversations);
  const currentUserId = useAppSelector(
    (state: RootState) => state.chats.currentUserId
  );
  console.log({ currentUserId });
  console.log({ chats });
  const messages = currentChatId !== null ? chats[currentChatId] || [] : [];
  console.log({ messages });
  useEffect(() => {}, [currentChatId]);
  console.log({ currentChatId });
  const handleSend = (text: string) => {
    if (currentChatId !== null) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        senderId: currentChatId,
        text,
        timestamp: new Date().toString(),
      };
      sendMessage(newMessage);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <StatusBar
        statusBarStyles={{
          container: { backgroundColor: "", borderRadius: "1rem" },
          activityStatus: { color: "#27AE60" },
        }}
      />
      <div className="flex-1 overflow-auto p-4 scrollbar-custom">
        {messages.map((message: ChatMessage) => (
          <div key={message.id}>
            <MessageBubble
              message={message.text}
              sender={message.senderId === currentUserId ? "user" : "other"}
            />
            <div className="text-center text-xs text-gray-500 my-2">
              {formatTime(message.timestamp)}
            </div>
          </div>
        ))}
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
