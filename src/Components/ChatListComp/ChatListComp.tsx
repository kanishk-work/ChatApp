import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";
import Chats from "./Chats";
import ProfileAndSearch from "./ProfileAndSearch";
import { getAllChatsData } from "../../DB/database";
import { Chat } from "../../Types/chats";
import { useGetChatsQuery } from "../../apis/chatApi";
import { setChats } from "../../Redux/slices/chatsSlice";

const ChatListComp = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chatListType, setChatListType] = useState<'all' | 'group' | 'single'>('all');

  const chats = useAppSelector((state: RootState) => state.chats.chats);

  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  console.log({ chats });

  const sortedChats = [...chats].sort((a: Chat, b: Chat) => {
    const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const filteredChats = searchTerm
    ? sortedChats.filter((chat) => {
      let chatName = chat.is_group
        ? chat.name
        : chat.chatUsers.find((chatUser) => chatUser.user.id !== activeUserId)
          ?.user.full_name || "Unknown";

      return chatName.toLowerCase().includes(searchTerm.toLowerCase());
    })
    : sortedChats;
  console.log({ filteredChats });

  // Filter chats based on chat list type (group or single) and search term
  const chatsList = (listType: string) => {
    if (listType === 'group') {
      return filteredChats.filter((chat) => chat.is_group);
    } else if (listType === 'single') {
      return filteredChats.filter((chat) => !chat.is_group);
    } else {
      return filteredChats;
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <ProfileAndSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div id="chatListSelector" className="flex gap-4 items-center dynamic-text-color-secondary">
        <button className="px-3 py-1 dynamic-accent-color rounded-3xl" onClick={() => setChatListType('all')}>All</button>
        <button className="px-3 py-1 dynamic-accent-color rounded-3xl" onClick={() => setChatListType('group')}>Groups</button>
        <button className="px-3 py-1 dynamic-accent-color rounded-3xl" onClick={() => setChatListType('single')}>Single</button>
      </div>
      <Chats chats={chatsList(chatListType)} listStyle="" />
    </div>
  );
};

export default ChatListComp;
