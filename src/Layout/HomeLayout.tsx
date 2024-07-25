import React from "react";
import ChatListComp from "../Components/ChatListComp/ChatListComp";
import ChatWindow from "../Components/ChatWindow/ChatWindow";
import { useAppContext } from "../Context/AppContext";

const HomeLayout: React.FC = () => {
  const { view, currentChatId } = useAppContext();

  return (
    <div className="h-[100vh] flex bg-[var(--bg-color)]">
      <div className="hidden sm:block w-[25vw] min-w-[320px] h-full">
        <ChatListComp />
      </div>
      <div className="flex-1 h-full">
        {view === "chatWindow" && currentChatId !== null && (
          <ChatWindow chatId={currentChatId} />
        )}
      </div>
    </div>
  );
};

export default HomeLayout;
