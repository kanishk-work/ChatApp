import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { RootState } from "../../Redux/store";
import { setActiveChat } from "../../Redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import { formatTime } from "../../Utils/formatTimeStamp";

interface ChatListProps {
  listStyle?: Styles;
}

const Chats: FC<ChatListProps> = ({ listStyle }) => {
  const dispatch = useAppDispatch();
  const { className, style } = applyStyles(listStyle);
  const activeChat = useAppSelector(
    (state: RootState) => state.chats.activeChat
  );
  const users = useAppSelector((state: RootState) => state.chats.users);
  const conversations = useAppSelector(
    (state: RootState) => state.chats.conversations
  );

  const handleChatClick = (chatId: number) => {
    if (activeChat !== chatId) {
      dispatch(setActiveChat(chatId));
      dispatch(setChatWindow(true));
    }
  };

  return (
    <div>
      {Object.values(users).map((user) => {
        const userConversations = conversations[user.id] || [];
        const lastMessage = userConversations[userConversations.length - 1];

        return (
          <div
            key={user.id}
            className={`flex items-center justify-center text-[var(--text-primary-light)] dark:text-[var(--text-primary)] w-full mb-2 p-1.5 hover:shadow-[0px_0px_20px_14px_#00000024] rounded-lg cursor-pointer ${className}`}
            onClick={() => handleChatClick(user.id)}
          >
            <img
              src={user.img}
              alt="user profile pic"
              className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 mr-3"
            />
            <div className="w-full">
              <div className="w-full flex justify-between">
                <span className="font-semibold text-sm">{user.name}</span>
                <span className="text-xs">
                  {lastMessage ? formatTime(lastMessage.timestamp) : ""}
                </span>
              </div>
              <span className="text-xs">
                {lastMessage ? lastMessage.text : "No messages yet"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
