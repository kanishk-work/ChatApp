import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { RootState } from "../../Redux/store";
import { setActiveChatId } from "../../Redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import useSocket from "../../apis/websocket";


import placeholderImage from "./../../assets/profilePlaceHolder.jpg";
import { Chat } from "../../Types/chats";
import { formatTime } from "../../Utils/formatTimeStamp";

interface ChatListProps {
  chats: Chat[]
  listStyle?: Styles;
}

const Chats: FC<ChatListProps> = ({chats, listStyle }) => {
  const { joinRoom } = useSocket();
  
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
    }
  };
  console.log(chats)
  
  const roomJoin = () => joinRoom('1');

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
        joinRoom(`${chat.chatSocket[0].socket_room}`);
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
                  {chat.lastMessage ? formatTime(chat.lastMessage.createdAt) : ""}
                </span>
              </div>
              <span className="text-xs">{chat.lastMessage.message}</span>
            </div>
          </div>
        );
      })}
      <button onClick={roomJoin}> joinroom</button>
    </div>
  );
};

export default Chats;
