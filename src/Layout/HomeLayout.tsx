import { FaImage, FaInfoCircle, FaStar } from "react-icons/fa";
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
import UserProfile from "../Components/MediaScreen/UserProfile";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import { useWindowSize } from "../Utils/windowSizeUtil";

const HomeLayout = () => {
  const { width } = useWindowSize();
  const chatWindow = useAppSelector(
    (state: RootState) => state.chatWindow.chatWindow
  );
  const currentChatId = useAppSelector(
    (state: RootState) => state.chats.activeChat
  );
  console.log({ currentChatId });

  const { showProfile, showSettings, showNewGroup } = useAppSelector(
    (state: RootState) => state.profile
  );
  const { showHelp, showNotification, showPrivacy, showTheme } = useAppSelector(
    (state: RootState) => state.settings
  );
  const showChatInfo = useAppSelector(
    (state: RootState) => state.chatInfo.showChatInfo
  );
  const handleBlockUser = () => {
    console.log("User blocked");
  };
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
        ) : showNotification ? (
          <Notification />
        ) : showPrivacy ? (
          <Privacy />
        ) : showTheme ? (
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
        <>
          <div className="flex-1 h-full">
            {(chatWindow === true && currentChatId !== null && (
              <ChatWindow />
            )) || (
              <div className="flex items-center justify-center h-screen">
                <div className="text-white">
                  Click on chat to start conversation
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <>
        {showChatInfo && (
          <div className={`${width < 1024 ? "w-full" : "w-[25vw"}`}>
            <UserProfile
              userProfileImage="https://via.placeholder.com/150"
              userName="John Doe"
              userBio="Lorem ipsum dolor sit amet."
              media={[
                "https://via.placeholder.com/150",
                "https://via.placeholder.com/150",
              ]}
              starredMessages={["Message 1", "Message 2"]}
              onBlockUser={handleBlockUser}
              profileOptions={[
                {
                  name: "Starred Messages",
                  icon: <FaStar />,
                  action: () => console.log("Starred Messages"),
                },
                {
                  name: "Shared Media",
                  icon: <FaImage />,
                  action: () => console.log("Shared Media"),
                },
                {
                  name: "User Details",
                  icon: <FaInfoCircle />,
                  action: () => console.log("User Details"),
                },
              ]}
            />
          </div>
        )}{" "}
      </>
    </div>
  );
};

export default HomeLayout;
