import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { RootState } from "../../Redux/store";
import {
  setActiveChatId,
  setUnreadMessagesDataChat,
} from "../../Redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";

import placeholderImage from "./../../assets/profilePlaceHolder.jpg";
import { Chat, UnreadMsgs } from "../../Types/chats";
import { formatTime } from "../../Utils/formatTimeStamp";
import { updateUnreadMessagesData } from "../../DB/database";
import { BiCheck, BiCheckDouble, BiTime } from "react-icons/bi";
import { shallowEqual } from "react-redux";
import useSocket from "../../apis/websocket";
import { useMessageReadUpdateMutation } from "../../apis/chatApi";

interface ChatListProps {
  chats: Chat[];
  listStyle?: Styles;
}

const Chats: FC<ChatListProps> = ({ chats, listStyle }) => {
  const dispatch = useAppDispatch();
  const { className, style } = applyStyles(listStyle);
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId,
    shallowEqual
  );

  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id,
    shallowEqual
  );
  const { messagesRead } = useSocket();

  const [messageReadUpdate] = useMessageReadUpdateMutation();

  const handleChatClick = async (
    chatId: number,
    chatSocket: string | undefined,
    unreadCount: number,
    unreadMsgsIdList: UnreadMsgs
  ) => {
    if (activeChatId !== chatId) {
      dispatch(setActiveChatId(chatId));
      dispatch(setChatWindow(true));

      if (unreadCount) {
        dispatch(
          setUnreadMessagesDataChat({ chatRoomId: chatId, actionType: "reset" })
        );

        try {
          await Promise.all([
            updateUnreadMessagesData({
              chatRoomId: chatId,
              actionType: "reset",
            }), // IndexedDB call
            messageReadUpdate({
              chat_room_id: chatId,
              chat_id_list: unreadMsgsIdList,
            }), // API call
          ]);

          // Trigger the messages read function after both operations are complete
          messagesRead({
            frq: chatSocket,
            chatRoomId: chatId,
            userId: activeUserId,
            chatIdList: unreadMsgsIdList,
          });
        } catch (error) {
          console.error("Error updating unread count on server:", error);
        }
      }
    }
  };

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

        const typingUser = typingUsers[chat.chatSocket[0]?.socket_room];

        const allRead = chat.lastMessage?.chatStatus.every(
          (status) => status.read
        );
        const anyDelivered = chat.lastMessage?.chatStatus.some(
          (status) => status.delivered
        );

        return (
          <div
            key={chat.id}
            className={`${
              chat.id === activeChatId && "dynamic-accent-color"
            } flex items-center justify-center text-[var(--text-primary-light)] dark:text-[var(--text-primary)] w-full mb-2 p-1.5 hover:shadow-[0px_0px_20px_14px_#00000024] rounded-lg cursor-pointer ${className}`}
            onClick={() =>
              handleChatClick(
                chat.id,
                chat.chatSocket[0].socket_room,
                chat.unreadCount,
                chat.unreadMsgs
              )
            }
          >
            <img
              src={chatProfilePic}
              alt="user profile pic"
              className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 mr-3"
            />
            <div className="w-full break-all">
              <div className="w-full flex justify-between">
                <span className="font-semibold">{chatName}</span>
                <span className="">
                  {chat.lastMessage
                    ? formatTime(chat.lastMessage.createdAt)
                    : formatTime(chat.createdAt)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center justify-center">
                  <span className="">
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
                  <span className="text-xs line-clamp-1 leading-6">
                    {typingUser
                      ? `${typingUser} typing....`
                      : chat.lastMessage?.chatFiles.length
                      ? "Shared file"
                      : chat.lastMessage?.message}
                  </span>
                </div>
                {chat.unreadCount ? (
                  <span className=" px-1.5 rounded-full bg-green-500 flex items-center">
                    {" "}
                    {chat.unreadCount}{" "}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
