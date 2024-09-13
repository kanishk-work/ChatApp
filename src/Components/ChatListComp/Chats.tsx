import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { RootState } from "../../Redux/store";
import { setActiveChatId, setUnreadCountChat } from "../../Redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";


import placeholderImage from "./../../assets/profilePlaceHolder.jpg";
import { Chat } from "../../Types/chats";
import { formatTime } from "../../Utils/formatTimeStamp";
import { updateUnreadMessageCountData } from "../../DB/database";

interface ChatListProps {
  chats: Chat[]
  listStyle?: Styles;
}

const Chats: FC<ChatListProps> = ({ chats, listStyle }) => {

  const dispatch = useAppDispatch();
  const { className, style } = applyStyles(listStyle);
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );

  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id
  );
  const handleChatClick = async (chatId: number) => {
    if (activeChatId !== chatId) {
      dispatch(setActiveChatId(chatId));
      dispatch(setChatWindow(true));
      dispatch(setUnreadCountChat({ chatRoomId: chatId, actionType: 'reset' }));
      updateUnreadMessageCountData(chatId, 'reset');
    }
  };
  console.log(chats)
  const typingUsers = useAppSelector((state: RootState) => state.chats.typing);

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

        const typingUser = typingUsers[chat.chatSocket[0].socket_room];

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
                  {chat.lastMessage ? formatTime(chat.lastMessage.createdAt) : formatTime(chat.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs line-clamp-1 leading-6">{typingUser ? `${typingUser} typing....` : chat.lastMessage?.chatFiles[0] ? "shared file" : chat.lastMessage?.message}</span>
                {chat.unreadCount ?
                  <span className="text-sm px-1.5 rounded-full bg-green-500 flex items-center"> {chat.unreadCount} </span> : ""
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
