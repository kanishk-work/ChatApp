import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { RootState } from "../../Redux/store";
import { setActiveChat } from "../../Redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";

interface ChatListProps {
  listStyle?: Styles;
}

const chats = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Akhil",
    text: "hello guys",
    time: "11:40",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Akhil",
    text: "hello guys",
    time: "11:40",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Akhil",
    text: "hello guys",
    time: "11:40",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Akhil",
    text: "hello guys",
    time: "11:40",
  },
];

const Chats: FC<ChatListProps> = ({ listStyle }) => {
  const dispatch = useAppDispatch();
  const { className, style } = applyStyles(listStyle);
  const activeChat = useAppSelector(
    (state: RootState) => state.chats.activeChat
  );

  const handleChatClick = (chatId: number) => {
    if (activeChat !== chatId) {
      dispatch(setActiveChat(chatId));
      dispatch(setChatWindow(true));
    }
  };

  return (
    <div className="scrollbar-custom overflow-auto">
      {chats.map((activeChat) => (
        <div
          key={activeChat.id}

          className={`flex items-center justify-center text-[var(--text-primary-light)] dark:text-[var(--text-primary)] w-full mb-2 p-1.5 hover:shadow-[0px_0px_20px_14px_#00000024] rounded-lg cursor-pointer ${className}`}
          onClick={() => handleChatClick(activeChat.id)}

        >
          <img
            src={activeChat.img}
            alt="user profile pic"
            className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 mr-3"
          />
          <div className="w-full">
            <div className="w-full flex justify-between">
              <span className="font-semibold text-sm">{activeChat.name}</span>
              <span className="text-xs">{activeChat.time}</span>
            </div>
            <span className="text-xs">{activeChat.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
