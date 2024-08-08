import React, { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../../apis/websocket";
import { RootState } from "../../Redux/store";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "./MessageComposer";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import StatusBar from "./StatusBar";
import { ChatMessage, addMessage } from "../../Redux/slices/chatsSlice";
import { formatTime } from "../../Utils/formatTimeStamp";

const ChatWindow: React.FC = () => {
  const { sendMessage } = useWebSocket();
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
  useEffect(() => {}, [showEmojiPicker]);
  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = (textMessage: string, file: string[] | null) => {
    if (currentChatId !== null) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        senderId: currentUserId,
        textMessage,
        file,
        timestamp: new Date().toString(),
      };
      dispatch(addMessage({ userId: currentChatId, message: newMessage }));
      // sendMessage(newMessage); // Uncomment if sending through WebSocket
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
          showEmojiPicker
        />
      </div>
    </div>
  );
};

export default ChatWindow;
