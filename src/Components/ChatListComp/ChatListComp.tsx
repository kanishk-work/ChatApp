import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";
import Chats from "./Chats";
import ProfileAndSearch from "./ProfileAndSearch";
import { getAllChatsData } from "../../DB/database";
import { setChats } from "../../Redux/slices/chatsSlice";
import { Chat } from "../../Types/chats";
import { shallowEqual } from "react-redux";

const ChatListComp = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chatListType, setChatListType] = useState<"all" | "group" | "single">(
    "all"
  );

  const chats = useAppSelector((state: RootState) => state.chats.chats);
  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id,
    shallowEqual
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadChats = async () => {
      try {
        const chatsFromDB = await getAllChatsData();
        dispatch(setChats(chatsFromDB));
      } catch (err) {
        setError("Failed to fetch chats from IndexedDB");
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, []);

  const getDateTime = (chat: Chat) => {
    return chat.lastMessage?.createdAt
      ? new Date(chat.lastMessage.createdAt).getTime()
      : chat.createdAt
      ? new Date(chat.createdAt).getTime()
      : 0;
  };

  const sortedChats = useMemo(() => {
    return [...chats].sort(
      (a: Chat, b: Chat) => getDateTime(b) - getDateTime(a)
    );
  }, [chats]);

  const filteredChats = useMemo(() => {
    return searchTerm
      ? sortedChats.filter((chat) => {
          let chatName = chat.is_group
            ? chat.name
            : chat.chatUsers.find(
                (chatUser) => chatUser.user.id !== activeUserId
              )?.user.full_name || "Unknown";

          return chatName.toLowerCase().includes(searchTerm.toLowerCase());
        })
      : sortedChats;
  }, [searchTerm, sortedChats, activeUserId]);

  const chatsList = useMemo(() => {
    if (chatListType === "group") {
      return filteredChats.filter((chat) => chat.is_group);
    } else if (chatListType === "single") {
      return filteredChats.filter((chat) => !chat.is_group);
    } else {
      return filteredChats;
    }
  }, [chatListType, filteredChats]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="w-full h-full flex flex-col">
      <ProfileAndSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex gap-4 items-center dynamic-text-color-secondary mb-2">
        <button
          className="px-3 py-1 dynamic-accent-color rounded-3xl"
          onClick={() => setChatListType("all")}
        >
          All
        </button>
        <button
          className="px-3 py-1 dynamic-accent-color rounded-3xl"
          onClick={() => setChatListType("group")}
        >
          Groups
        </button>
        <button
          className="px-3 py-1 dynamic-accent-color rounded-3xl"
          onClick={() => setChatListType("single")}
        >
          Single
        </button>
      </div>
      <Chats chats={chatsList} listStyle="" />
    </div>
  );
};

export default ChatListComp;
