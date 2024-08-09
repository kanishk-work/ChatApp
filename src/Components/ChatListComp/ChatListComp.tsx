import Chats from "./Chats";
import ProfileAndSearch from "./ProfileAndSearch";

const ChatListComp = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <ProfileAndSearch />
      <Chats listStyle="" />
    </div>
  );
};

export default ChatListComp;
