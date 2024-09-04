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
  const { refetch: refetchChats } = useGetChatsQuery();
  
  const chats = useAppSelector((state: RootState) => state.chats.chats);

  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id
  );
  const dispatch = useAppDispatch()
  useEffect(() => {
      const loadChats = async () => {
          try {
              const chatsFromDB = await getAllChatsData();
              dispatch(setChats(chatsFromDB));
          } catch (err) {
              setError('Failed to fetch chats from IndexedDB');
          } finally {
              setLoading(false);
          }
      };

      loadChats();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  console.log(chats)


  const filteredChats = searchTerm
    ? chats.filter((chat) => {
        let chatName = chat.is_group
          ? chat.name
          : chat.chatUsers.find((chatUser) => chatUser.user.id !== activeUserId)
              ?.user.full_name || "Unknown";

        return chatName.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : chats;

    console.log(filteredChats)

  return (
    <div className="w-full h-full flex flex-col">
      <ProfileAndSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Chats chats={filteredChats} listStyle="" />
    </div>
  );
};

export default ChatListComp;
