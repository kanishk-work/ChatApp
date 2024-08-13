import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setShowNewChat } from "../../Redux/slices/profileSlice";
import { useState } from "react";
import { useDebounce } from "../../Utils/CustomHooks/useDebounce";
import SideHeader from "../Shared/SideHeader";
import { useSearchUsersQuery } from "../../apis/authApi";
import { BiSearch } from "react-icons/bi";
import { FaExclamationCircle } from "react-icons/fa";
import { useStartChatMutation } from "../../apis/chatApi";
import { setActiveChatId } from "../../Redux/slices/chatsSlice";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import { RootState } from "../../Redux/store";

interface usersData {
  id: number;
  full_name: string;
  short_name: string;
  role: string;
  profile_pic: string;
}
const NewChat = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const debounceSearch = useDebounce(searchTerm, 500);

  const {
    data: users,
    error,
    isLoading,
  } = useSearchUsersQuery(debounceSearch, {
    skip: !debounceSearch,
  });
  console.log(users?.list);
  // console.log(error);

  const [startChat] = useStartChatMutation();

  const handleSelect = async (userId: number) => {
    const body = {
      toUserId: userId,
    };
    
    const {
      data: res,
      error,
    } = await (startChat(body));

    if(error){
      console.log(error);
    }else{
      if (activeChatId !== userId) {
        dispatch(setActiveChatId(userId));
        dispatch(setChatWindow(true));
        // joinRoom(chatId);
      }
      console.log(res)
    }
  }

  return (
    <>
      <SideHeader
        title="new chat"
        backFn={() => dispatch(setShowNewChat(false))}
      />
        <div className="relative mb-2">
          <input
            type="text"
            className="w-full bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)] shadow-sm dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] rounded focus:outline-none py-1 px-3 focus:shadow-lg"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <BiSearch className="absolute right-3 top-2 text-text-secondary" />
        </div>

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
                onClick={() => handleSelect(user.id)}
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
        <div className="flex gap-2 items-center absolute right-3 bottom-2">
          {showAlert && (
            <div className="transition-all ease-in-out delay-150 p-1 rounded-lg dynamic-notif text-base">
              <span className="flex items-center gap-2">
                <FaExclamationCircle />
                Members not selected
              </span>
            </div>
          )}
        </div>
    </>
  );
};

export default NewChat;