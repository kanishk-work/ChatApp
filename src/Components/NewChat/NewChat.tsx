import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setShowNewChat } from "../../Redux/slices/profileSlice";
import { useState } from "react";
import { useDebounce } from "../../Utils/CustomHooks/useDebounce";
import SideHeader from "../Shared/SideHeader";
import { useSearchUsersQuery } from "../../apis/authApi";
import { useStartChatMutation } from "../../apis/chatApi";
import { setActiveChatId } from "../../Redux/slices/chatsSlice";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import { RootState } from "../../Redux/store";
import useSocket from "../../apis/websocket";
import SearchBar from "../SearchBar/SearchBar";
import { storeChatData, storeChatMessagesData } from "../../DB/database";
import { ConversationsType } from "../../Types/conversationsType";
import { shallowEqual } from "react-redux";

interface usersData {
  id: number;
  full_name: string;
  short_name: string;
  role: string;
  profile_pic: string;
  notif_room: string;
}

const NewChat = () => {
  const [isNewChatLoading, setIsNewChatLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId,
    shallowEqual
  );
  const debounceSearch = useDebounce(searchTerm, 500);
  const { newInvite, joinRoom } = useSocket();

  const {
    data: users,
    error,
    isLoading,
  } = useSearchUsersQuery(debounceSearch, {
    skip: !debounceSearch,
  });

  const [startChat] = useStartChatMutation();

  const handleSelect = async (user: usersData) => {
    setIsNewChatLoading(true);
    const body = {
      toUserId: user.id,
    };

    const { data: res, error } = await startChat(body);

    if (error) {
      console.error(error);
    } else if (res) {
      const chatMessageEntry: ConversationsType = {
        id: res?.id,
        client_id: res?.client_id,
        createdAt: res?.createdAt,
        deletedAt: res?.deletedAt,
        updatedAt: res?.updatedAt,
        is_deleted: res?.is_deleted,
        is_group: res?.is_group,
        name: res?.name,
        profile_pic: res?.profile_pic,
        messages: { chatsList: [], length: 0 },
        pinnedChat: [],
        unreadMsgs: res?.unreadMsgs,
      };
      await storeChatData([res]);
      await storeChatMessagesData([chatMessageEntry]);

      // const chatsFromDB = await getAllChatsData();
      // dispatch(setChats(chatsFromDB));
      // await refetchChats();
      const newInviteData = {
        frq: user.notif_room,
        chatFrq: res?.chatSocket[0]?.socket_room,
        resp: res,
      };

      newInvite(newInviteData);
      if (activeChatId !== res?.id) {
        dispatch(setActiveChatId(res?.id));
        dispatch(setChatWindow(true));
        joinRoom(`${res?.chatSocket[0]?.socket_room}`);
      }
    }

    setIsNewChatLoading(false);
  };

  return (
    <>
      <SideHeader
        title="new chat"
        backFn={() => dispatch(setShowNewChat(false))}
      />
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        searchBarStyles={"mb-2"}
      />

      {searchTerm?.length < 2 ? (
        <p className="dark:text-text-primary text-text-primary-light">
          Enter atleast 2 letters to search
        </p>
      ) : isLoading ? (
        <p className="dark:text-text-primary text-text-primary-light">
          Loading...
        </p>
      ) : error ? (
        <p className="dark:text-text-primary text-text-primary-light">
          Error {error?.data?.message}
        </p>
      ) : !users?.list?.length ? (
        <p className="dark:text-text-primary text-text-primary-light">
          Users not found
        </p>
      ) : (
        <ul className="scrollbar-custom overflow-auto">
          {users?.list.map((user: usersData) => (
            <li
              key={user.id}
              onClick={() => handleSelect(user)}
              className={`dark:text-text-primary text-text-primary-light text-lg flex items-center gap-5 p-3 w-full dark:hover:bg-accent-color hover:bg-accent-color-light hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg cursor-pointer`}
            >
              <img
                src={user.profile_pic}
                alt="user profile pic"
                className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 "
              />
              <div className="grow">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {user.full_name} ({user.role})
                  </span>
                  <span className="text-xs">{user.short_name}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NewChat;
