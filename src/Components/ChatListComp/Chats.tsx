import { FC } from "react";
import { useAppContext } from "../../Context/AppContext";
import { Styles, applyStyles } from "../../utils/styleUtils";
import { RootState } from "../../redux/store";
import { setActiveChat } from "../../redux/slices/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setView } from "../../redux/slices/viewSlice";

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
    dispatch(setActiveChat(chatId));
    dispatch(setView("chatWindow"));
  };

  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat.id}
          style={style}
          className={`flex items-center justify-center text-slate-100 w-full mb-2 p-1.5 hover:shadow-[0px_0px_20px_14px_#00000024] rounded-lg cursor-pointer ${className}`}
          onClick={() => handleChatClick(chat.id)}
        >
          <img
            src={chat.img}
            alt="user profile pic"
            className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 mr-3"
          />
          <div className="w-full">
            <div className="w-full flex justify-between">
              <span className="font-semibold text-sm">{chat.name}</span>
              <span className="text-xs">{chat.time}</span>
            </div>
            <span className="text-xs">{chat.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
