import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { RootState } from "../../Redux/store";
import { setActiveChatId } from "../../Redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import useSocket from "../../apis/websocket";


import placeholderImage from "./../../assets/profilePlaceHolder.jpg";
import {
  useGetConversationsMutation,
} from "../../apis/chatApi";
import { Chat } from "../../Types/chats";

interface ChatListProps {
  chats: Chat[]
  listStyle?: Styles;
}

const Chats: FC<ChatListProps> = ({chats, listStyle }) => {
  const { joinRoom,joinChatRoom } = useSocket();
  
  const dispatch = useAppDispatch();
  // const [conversations, setConversations] = useState([]);
  const { className, style } = applyStyles(listStyle);
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );
  // const chats = useAppSelector((state: RootState) => state.chats.chats);
  const conversations = useAppSelector(
    (state: RootState) => state.chats.conversations
  );
  // const { sendMessage, joinRoom } = useSocket(import.meta.env.VITE_HOST_URL);
  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id
  );
  const [getConversations] = useGetConversationsMutation();
  // useEffect(() => {
  //   const fetchConversations = async () => {
  //     if (activeChatId !== null) {
  //       try {
  //         const res = await getConversations().unwrap();
  //         console.log("Conversations fetched:", res);
  //       } catch (error) {
  //         console.error("Failed to fetch conversations:", error);
  //       }
  //     }
  //   };

  //   fetchConversations();
  // }, [activeChatId, getConversations]);
  const handleChatClick = async (chatId: number) => {
    if (activeChatId !== chatId) {
      dispatch(setActiveChatId(chatId));
      dispatch(setChatWindow(true));
      try {
        const response = await getConversations(chatId).unwrap();
        console.log("API response:", response);
        // joinRoom(`${chatId}`);
      } catch (err) {
        console.error("API error:", err);
      }
    }
  };
  console.log(chats)
  
  const roomJoin = () => joinChatRoom('1');
  // const { getNewMessage, socket, sendMessage } = useSocket();
  // useEffect(() => {
  //   socket?.on("resp", (data) => {
  //     console.log(data)
  //   })
  // })

  return (
    <div className="overflow-auto scrollbar-custom">
      {chats.map((chat) => {
        // const lastMessage = conversations?.[chat.id - 1]?.message;
        let chatName = chat.is_group
          ? chat.name
          : chat.chatUsers.find((chatUser) => chatUser.user.id !== activeUserId)
              ?.user.full_name || "Unknown";
        let chatProfilePic = chat.is_group
          ? chat.profile_pic || placeholderImage
          : chat.chatUsers.find((chatUser) => chatUser.user.id !== activeUserId)
              ?.user.profile_pic || placeholderImage;
        joinChatRoom(`${chat.id}`);
        return (
          <div
            key={chat.id}
            className={`flex items-center justify-center text-[var(--text-primary-light)] dark:text-[var(--text-primary)] w-full mb-2 p-1.5 hover:shadow-[0px_0px_20px_14px_#00000024] rounded-lg cursor-pointer ${className}`}
            onClick={() => handleChatClick(chat.id)}
          >
            <img
              src={chatProfilePic}
              alt="user profile pic"
              className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 mr-3"
            />
            <div className="w-full">
              <div className="w-full flex justify-between">
                <span className="font-semibold text-sm">{chatName}</span>
                {/* <span className="text-xs">
                  {lastMessage ? formatTime(conversations.created) : ""}
                </span> */}
              </div>
              {/* <span className="text-xs">{lastMessage}</span> */}
            </div>
          </div>
        );
      })}
      <button onClick={roomJoin}> joinroom</button>
    </div>
  );
};

export default Chats;
