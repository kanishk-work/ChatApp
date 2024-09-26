import { FaImage, FaInfoCircle, FaStar } from "react-icons/fa";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import { useWindowSize } from "../Utils/windowSizeUtil";
import { useGetChatsQuery, useGetConversationsMutation } from "../apis/chatApi";
import { useEffect, Suspense, lazy } from "react";
import Loader from "../Components/Shared/Loader";
import { shallowEqual } from "react-redux";

const ChatListComp = lazy(
  () => import("../Components/ChatListComp/ChatListComp")
);
const Help = lazy(() => import("../Components/Help/Help"));
const NewChat = lazy(() => import("../Components/NewChat/NewChat"));
const NewGroup = lazy(() => import("../Components/NewGroup//NewGroup"));
const Notification = lazy(
  () => import("../Components/Notification/Notification")
);
const Privacy = lazy(() => import("../Components/Privacy/Privacy"));
const Profile = lazy(() => import("../Components/Profile/Profile"));
const Settings = lazy(() => import("../Components/Settings/Settings"));
const Theme = lazy(() => import("../Components/Theme/Theme"));
const ChatWindow = lazy(() => import("../Components/ChatWindow/ChatWindow"));
const UserProfile = lazy(() => import("../Components/MediaScreen/UserProfile"));

const HomeLayout = () => {
  const [getConversations] = useGetConversationsMutation();
  useGetChatsQuery();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        await getConversations(0);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const { width } = useWindowSize();
  const chatWindow = useAppSelector(
    (state: RootState) => state.chatWindow.chatWindow,
    shallowEqual
  );
  const activeRoomId = useAppSelector(
    (state: RootState) => state.chats.activeChatId,
    shallowEqual
  );

  const { showProfile, showSettings, showNewGroup, showNewChat } =
    useAppSelector((state: RootState) => state.profile, shallowEqual);
  const { showHelp, showNotification, showPrivacy, showTheme } = useAppSelector(
    (state: RootState) => state.settings,
    shallowEqual
  );
  const showChatInfo = useAppSelector(
    (state: RootState) => state.chatInfo.showChatInfo,
    shallowEqual
  );

  const isChatsLoading = useAppSelector(
    (state: RootState) => state.loading.isChatsLoading,
    shallowEqual
  );
  const isConversationsLoading = useAppSelector(
    (state: RootState) => state.loading.isConversationsLoading,
    shallowEqual
  );

  return (
    <div className="h-[100svh] flex dynamic-background-color">
      {isChatsLoading || isConversationsLoading ? (
        <div className="dynamic-text-color-primary w-full flex items-center justify-center gap-4">
          <h1>Loading Your Chats</h1>
          <Loader loaderStyles={"text-focus-secondary"} />
        </div>
      ) : (
        <>
          <div
            className={`${
              width > 764 ? "w-[25vw] min-w-[320px]" : "w-[100vw]"
            } h-full p-2 shadow-[inset_-10px_0px_20px_0px_#00000024] flex flex-col overflow-auto scrollbar-custom`}
          >
            <Suspense
              fallback={<Loader loaderStyles={"text-focus-secondary"} />}
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
                    media={[
                      "https://via.placeholder.com/150",
                      "https://via.placeholder.com/150",
                    ]}
                    starredMessages={["Message 1", "Message 2"]}
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
                ) : chatWindow && activeRoomId !== null ? (
                  <ChatWindow />
                ) : (
                  <ChatListComp />
                )
              ) : (
                <ChatListComp />
              )}
            </Suspense>
          </div>

          {width > 764 && (
            <>
              {!(width <= 1300 && showChatInfo) && (
                <div className={`flex-1 h-full`}>
                  <Suspense
                    fallback={<Loader loaderStyles={"text-focus-secondary"} />}
                  >
                    {chatWindow && activeRoomId !== null ? (
                      <ChatWindow />
                    ) : (
                      <div className="flex items-center justify-center h-screen">
                        <div className="text-white">
                          Click on chat to start conversation
                        </div>
                      </div>
                    )}
                  </Suspense>
                </div>
              )}

              {showChatInfo && (
                <div
                  className={`${
                    width > 1300 ? "w-[25vw] min-w-[320px]" : "w-full"
                  } h-full`}
                >
                  <Suspense
                    fallback={<Loader loaderStyles={"text-focus-secondary"} />}
                  >
                    <UserProfile
                      media={[
                        "https://via.placeholder.com/150",
                        "https://via.placeholder.com/150",
                      ]}
                      starredMessages={["Message 1", "Message 2"]}
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
                  </Suspense>
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
