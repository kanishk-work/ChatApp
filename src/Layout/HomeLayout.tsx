import {
  ChatListComp,
  Help,
  NewGroup,
  Notification,
  Privacy,
  Profile,
  Settings,
  Theme,
} from "../Components";
import ChatWindow from "../Components/ChatWindow/ChatWindow";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import { useWindowSize } from "../Utils/windowSizeUtil";

const HomeLayout = () => {
  const { width, height } = useWindowSize();
  const chatWindow = useAppSelector(
    (state: RootState) => state.chatWindow.chatWindow
  );
  const currentChatId = useAppSelector(
    (state: RootState) => state.chats.activeChat
  );

  const { showProfile, showSettings, showNewGroup } = useAppSelector(
    (state: RootState) => state.profile
  );
  const { showHelp, showNotification, showPrivacy, showTheme } = useAppSelector(
    (state: RootState) => state.settings
  );

  return (
    <div className="h-[100svh] flex bg-[var(--bg-color-light)] dark:bg-[var(--bg-color)]">
      <div
        className={`${
          width > 764 ? "w-[25vw] min-w-[320px]" : "w-[100vw]"
        } h-full p-3 shadow-[inset_-10px_0px_20px_0px_#00000024] flex flex-col justify-between`}
      >
        {showProfile ? (
          <Profile />
        ) : showNewGroup ? (
          <NewGroup />
        ) : showNotification ? <Notification /> : showPrivacy ? <Privacy/>: showTheme ? (
          <Theme />
        ) : showHelp ? (
          <Help />
        ) : showSettings ? (
          <Settings />
        ) : width <= 764 ? (
          chatWindow === true && currentChatId !== null ? (
            <ChatWindow />
          ) : (
            <ChatListComp />
          )
        ) : (
          <ChatListComp />
        )}
      </div>
      {width > 764 && (
        <div className="flex-1 h-full">
          {chatWindow === true && currentChatId !== null && <ChatWindow />}
          <div>
            <h1>Window Size</h1>
            <p>Width: {width}px</p>
            <p>Height: {height}px</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLayout;
