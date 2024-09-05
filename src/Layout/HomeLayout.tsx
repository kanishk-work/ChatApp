import { FaImage, FaInfoCircle, FaStar } from "react-icons/fa";
import {
  ChatListComp,
  Help,
  NewChat,
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
import { useGetChatsQuery, useGetConversationsMutation } from "../apis/chatApi";
import { useEffect } from "react";
import Loader from "../Components/Shared/Loader";
import useSocket from "../apis/websocket";

const HomeLayout = () => {
  const [getConversations] = useGetConversationsMutation();
  useGetChatsQuery();  
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        await getConversations(0);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    fetchConversations();
    
  }, []);
  const chats = useAppSelector((state: RootState) => state.chats.chats);
  const { joinRoom } = useSocket();

  chats?.forEach(chat => {
    console.log("joining from homelayout")
    joinRoom(`${chat.chatSocket[0].socket_room}`);
  });
  const { width } = useWindowSize();
  const chatWindow = useAppSelector(
    (state: RootState) => state.chatWindow.chatWindow
  );
  const activeRoomId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );
  console.log({ activeRoomId });

  const { showProfile, showSettings, showNewGroup, showNewChat } =
    useAppSelector((state: RootState) => state.profile);
  const { showHelp, showNotification, showPrivacy, showTheme } = useAppSelector(
    (state: RootState) => state.settings
  );
  const showChatInfo = useAppSelector(
    (state: RootState) => state.chatInfo.showChatInfo
  );

  const isChatsLoading = useAppSelector((state: RootState) => state.loading.isChatsLoading);
  const isConversationsLoading = useAppSelector((state: RootState) => state.loading.isConversationsLoading);

  const handleBlockUser = () => {
    console.log("User blocked");
  };
  return (
    <div className="h-[100svh] flex dynamic-background-color">
      {isChatsLoading || isConversationsLoading ? (
        <div className="dynamic-text-color-primary w-full flex items-center justify-center gap-4">
          <h1>Loading Your Chats</h1>
          <Loader loaderStyles={'text-focus-secondary'}/>
        </div>
        
      ) : (
        <>
          <div
            className={`${
              width > 764 ? "w-[25vw] min-w-[320px]" : "w-[100vw]"
            } h-full p-2 shadow-[inset_-10px_0px_20px_0px_#00000024] flex flex-col overflow-auto scrollbar-custom`}
          >
            {showProfile ? (
              <Profile />
            ) : showNewChat ? (
              <NewChat />
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
              showChatInfo ? (
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
              ) : chatWindow === true && activeRoomId !== null ? (
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
              {!(width <= 1300 && showChatInfo) && (
                <div className={`flex-1 h-full`}>
                  {(chatWindow === true && activeRoomId !== null && (
                    <ChatWindow />
                  )) || (
                    <div className="flex items-center justify-center h-screen">
                      <div className="text-white">
                        Click on chat to start conversation
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showChatInfo && (
                <div
                  className={`${
                    width > 1300 ? "w-[25vw] min-w-[320px]" : "w-full"
                  } h-full`}
                >
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
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomeLayout;
