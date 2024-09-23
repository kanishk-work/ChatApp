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
import { BiCheck, BiCheckDouble, BiTime } from "react-icons/bi";
import { useMessageReadUpdateMutation } from "../../apis/chatApi";
import useSocket from "../../apis/websocket";

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
  const { messagesRead } = useSocket();

  const [messageReadUpdate] = useMessageReadUpdateMutation();

  const handleChatClick = async (chatId: number, chatSocket: string | undefined, lastMessageId: number) => {
    if (activeChatId !== chatId) {
      try {
        dispatch(setActiveChatId(chatId));
        dispatch(setChatWindow(true));
        if(lastMessageId){
          dispatch(setUnreadCountChat({ chatRoomId: chatId, actionType: 'reset' }));
          await updateUnreadMessageCountData(chatId, 'reset');
          await messageReadUpdate({ chat_room_id: chatId });
          messagesRead({frq: chatSocket, chatRoomId: chatId, lastChatId: lastMessageId})
        }
      }
      catch{
        console.error("Error updating unread count on server");
      }
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

        const allRead = chat.lastMessage?.chatStatus.every((status) => status.read);
        const anyDelivered = chat.lastMessage?.chatStatus.some((status) => status.delivered);

        return (
          <div
            key={chat.id}
            className={`${chat.id === activeChatId && 'dynamic-accent-color'} flex items-center justify-center text-[var(--text-primary-light)] dark:text-[var(--text-primary)] w-full mb-2 p-1.5 hover:shadow-[0px_0px_20px_14px_#00000024] rounded-lg cursor-pointer ${className}`}
            onClick={() => handleChatClick(chat.id, chat.chatSocket[0].socket_room, chat.lastMessage?.id)}
          >
            <img
              src={chatProfilePic}
              alt="user profile pic"
              className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 mr-3"
            />
            <div className="w-full break-all">
              <div className="w-full flex justify-between">
                <span className="font-semibold text-sm">{chatName}</span>
                <span className="text-xs">
                  {chat.lastMessage ? formatTime(chat.lastMessage.createdAt) : formatTime(chat.createdAt)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center justify-center">
                  <span className="text-sm">
                    {chat.lastMessage?.sender_id === activeUserId ? (
                      allRead ? (
                        <BiCheckDouble />
                      ) : anyDelivered ? (
                        <BiCheck />
                      ) : (
                        <BiTime />
                      )
                    ) : null}
                  </span>
                  <span className="text-xs line-clamp-1 leading-6">{typingUser ? `${typingUser} typing....` : chat.lastMessage?.chatFiles.length ? "Shared file" : chat.lastMessage?.message}</span>
                </div>
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
