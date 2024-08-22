import { BiDotsVerticalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  setShowNewChat,
  setShowNewGroup,
  setShowProfile,
  setShowSettings,
} from "../../Redux/slices/profileSlice";
import DropDown from "../Shared/DropDown";
import profilePlaceHolder from "./../../assets/profilePlaceHolder.jpg";
import SearchBar from "../SearchBar/SearchBar";
import { FC, useEffect, useState } from "react";
import { useDebounce } from "../../Utils/CustomHooks/useDebounce";
import { useGetChatsQuery } from "../../apis/chatApi";
import { Styles } from "../../Utils/styleUtils";

interface ProfileAndSearchProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  listStyle?: Styles;
}

const ProfileAndSearch:FC<ProfileAndSearchProps> = ({searchTerm, setSearchTerm}) => {
  const menu_items = [
    {
      name: "new chat",
      action: () => dispatch(setShowNewChat(true)),
    },
    {
      name: "new group",
      action: () => dispatch(setShowNewGroup(true)),
    },
    {
      name: "starred message",
      action: () => dispatch(setShowSettings(true)),
    },
    {
      name: "pinned chats",
      action: () => dispatch(setShowSettings(true)),
    },
    {
      name: "settings",
      action: () => dispatch(setShowSettings(true)),
    },
  ];
  const activeUser = useAppSelector((state) => state.activeUser);
  const dispatch = useAppDispatch();
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const debounceSearch = useDebounce(searchTerm, 500);
  
  // const { data, error, isLoading, refetch: refetchChats } = useGetChatsQuery(debounceSearch.length > 2 ? debounceSearch : undefined);

  // useEffect(() => {
  //   if (debounceSearch.length <= 2) {
  //     refetchChats();
  //   }
  // }, [debounceSearch, refetchChats]);

  // const {
  //   data: users,
  //   error,
  //   isLoading,
  // } = useGetChatsQuery(debounceSearch, {
  //   skip: debounceSearch.length < 2 || !debounceSearch,
  // });

  // console.log(debounceSearch, data);

  return (
    <div className="w-full flex items-center gap-3 mb-3">
      <button onClick={() => dispatch(setShowProfile(true))}>
        <img
          src={
            (activeUser.profile_pic && activeUser.profile_pic) ||
            profilePlaceHolder
          }
          alt="user profile pic"
          className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0"
        />
      </button>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        searchBarStyles={{ flex: 1 }}
      />

      <DropDown
        optionsList={menu_items}
        btnClassName={
          "flex items-center text-2xl py-1 text-[var(--text-secondary-light)] dark:text-[var(--text-secondary)] rounded-full data-[hover]:bg-[var(--accent-color-light)] dark:data-[hover]:bg-[var(--accent-color)] data-[open]:bg-[var(--accent-color-light)] dark:data-[open]:bg-[var(--accent-color)] data-[focus]:outline-1 data-[focus]:outline-white"
        }
        triggerElement={<BiDotsVerticalRounded />}
        dropBoxClassName={"right-0"}
      />
    </div>
  );
};

export default ProfileAndSearch;
