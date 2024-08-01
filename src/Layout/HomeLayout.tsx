import { ChatListComp, Profile, Settings } from "../Components";
import ChatWindow from "../Components/ChatWindow/ChatWindow";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";

const HomeLayout = () => {
  const view = useAppSelector((state: RootState) => state.view.view);
  const currentChatId = useAppSelector(
    (state: RootState) => state.chats.activeChat
  );

  const { showProfile, showNotifications, showSettings } = useAppSelector(
    (state: RootState) => state.profile
  );
  const { showHelp, showNotification, showPrivacy, showShortcuts, showTheme } =
    useAppSelector((state: RootState) => state.settings);

  return (
    <div className="h-[100vh] flex bg-[var(--bg-color)]">
      <div className="w-[25vw] min-w-[320px] h-full p-3 shadow-[inset_-10px_0px_20px_0px_#00000024] flex flex-col justify-between">
        {showProfile ? (
          <Profile />
        ) : showNotification ? null : showPrivacy ? null : showTheme ? null : showHelp ? null : showSettings ? (
          <Settings />
        ) : (
          <ChatListComp />
        )}
      </div>
      <div className="flex-1 h-full">
        {view === "chatWindow" && currentChatId !== null && <ChatWindow />}
      </div>
    </div>
  );
};

export default HomeLayout;
