import React, { useEffect } from "react";
import { useWebSocket } from "../../apis/websocket";
import { RootState } from "../../redux/store";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "./MessageComposer";
import { Message } from "../../types/message";
import { useAppSelector } from "../../redux/hooks";
import StatusBar from "./StatusBar";

const ChatWindow: React.FC = () => {
  const { sendMessage } = useWebSocket();
  const currentChatId = useAppSelector(
    (state: RootState) => state.chats.activeChat
  );
  const chats = useAppSelector((state: RootState) => state.chats.chats);

  const messages = currentChatId !== null ? chats[currentChatId] || [] : [];
  console.log({ messages });
  useEffect(() => {}, [currentChatId]);
  console.log({ currentChatId });
  const handleSend = (text: string) => {
    if (currentChatId !== null) {
      const newMessage: Message = {
        id: Date.now(),
        chatId: currentChatId,
        text,
        sender: "user",
        timestamp: new Date(),
      };
      sendMessage(newMessage);
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <StatusBar
        statusBarStyles={{ backgroundColor: "InfoText", borderRadius: "1rem" }}
      />
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message: Message) => (
          <div key={message.id}>
            <MessageBubble message={message.text} sender={message.sender} />
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
