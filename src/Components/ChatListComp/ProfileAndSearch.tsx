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
import { useState } from "react";
import { useSearchUsersQuery } from "../../apis/authApi";
import { useDebounce } from "../../Utils/CustomHooks/useDebounce";

const ProfileAndSearch = () => {
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceSearch = useDebounce(searchTerm, 500);
  const {
    data: users,
    error,
    isLoading,
  } = useSearchUsersQuery(debounceSearch, {
    skip: debounceSearch.length < 2 || !debounceSearch,
  });

  console.log("searchResult", users?.list);

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
