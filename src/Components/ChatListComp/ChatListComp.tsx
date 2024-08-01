import Chats from "./Chats";
import ProfileAndSearch from "./ProfileAndSearch";

const ChatListComp = () => {
  return (
    <div className="w-full overflow-auto flex flex-col">
      <ProfileAndSearch />
      <Chats listStyle="" />
      <div className="flex flex-col justify-end p-2">
        {/* <ThemeSwitcher /> */}
      </div>
    </div>
  );
};

export default ChatListComp;
