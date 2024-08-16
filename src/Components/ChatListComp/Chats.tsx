import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { RootState } from "../../Redux/store";
import { setActiveChatId } from "../../Redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import { formatTime } from "../../Utils/formatTimeStamp";
import useSocket from "../../apis/websocket";
import placeholderImage from "./../../assets/profilePlaceHolder.jpg"
import { useGetChatsQuery } from "../../apis/chatApi";

interface ChatListProps {
  listStyle?: Styles;
}

const Chats: FC<ChatListProps> = ({ listStyle }) => {
  const { refetch: refetchChats } = useGetChatsQuery();
  const dispatch = useAppDispatch();
  const { className, style } = applyStyles(listStyle);
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const chats = useAppSelector((state: RootState) => state.chats.chats);
  const conversations = useAppSelector(
    (state: RootState) => state.chats.conversations
  );
  // const { sendMessage, joinRoom } = useSocket(import.meta.env.VITE_HOST_URL);
  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id
  );

  const handleChatClick = async (chatId: number) => {
    if (activeChatId !== chatId) {
      dispatch(setActiveChatId(chatId));
      dispatch(setChatWindow(true));
      // joinRoom(chatId);
    }
  };

  return (
    <div className="overflow-auto scrollbar-custom">
      {chats.map((chat) => {
        const userConversations = conversations[chat.id] || [];
        const lastMessage = userConversations[userConversations.length - 1];
        let chatName = chat.is_group
          ? chat.name
          : chat.chatUsers.find((chatUser) => chatUser.user.id !== activeUserId)?.user.full_name || "Unknown";
          let chatProfilePic = chat.is_group
          ? chat.profile_pic || placeholderImage
          : chat.chatUsers.find((chatUser) => chatUser.user.id !== activeUserId)?.user.profile_pic || placeholderImage;

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
                <span className="text-xs">
                  {lastMessage ? formatTime(lastMessage.timestamp) : ""}
                </span>
              </div>
              <span className="text-xs">
                {lastMessage && lastMessage.textMessage
                  ? lastMessage.textMessage
                  : lastMessage?.file
                    ? `Image`
                    : "No messages yet"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
