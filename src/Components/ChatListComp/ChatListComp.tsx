import Chats from "./Chats";
import ProfileAndSearch from "./ProfileAndSearch";

const ChatListComp = () => {
  return (
    <div className="w-full overflow-auto flex flex-col">
      <ProfileAndSearch />
      <Chats listStyle="bg-blue-500" />
      <div className="flex flex-col justify-end p-2">
        {/* <ThemeSwitcher /> */}
      </div>
    </div>
  );
};

export default ChatListComp;
