import { useState } from "react";
import { useAppSelector } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";
import Chats from "./Chats";
import ProfileAndSearch from "./ProfileAndSearch";

const ChatListComp = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const chats = useAppSelector((state: RootState) => state.chats.chats);
  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id
  );

  const filteredChats = searchTerm
    ? chats.filter((chat) => {
        let chatName = chat.is_group
          ? chat.name
          : chat.chatUsers.find((chatUser) => chatUser.user.id !== activeUserId)
              ?.user.full_name || "Unknown";

        return chatName.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : chats;

  return (
    <div className="w-full h-full flex flex-col">
      <ProfileAndSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Chats chats={filteredChats} listStyle="" />
    </div>
  );
};

export default ChatListComp;
