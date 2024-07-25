import React from "react";
import MessageComposer from "./MessageComposer";

interface ChatWindowProps {
  chatId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  //   const { currentChatId, setView } = useAppContext();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {/* Render chat messages based on currentChatId */}
        {/* <button onClick={() => setView("chatList")}>Back to Chat List</button> */}
        <p>Messages for chat ID {chatId} go here...</p>
      </div>
      <MessageComposer />
    </div>
  );
};

export default ChatWindow;
