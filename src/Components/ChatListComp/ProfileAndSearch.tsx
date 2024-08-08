import { BiDotsVerticalRounded, BiSearch } from "react-icons/bi";
import { useAppDispatch } from "../../Redux/hooks";
import {
  setShowNewChat,
  setShowNewGroup,
  setShowProfile,
  setShowSettings,
} from "../../Redux/slices/profileSlice";
import DropDown from "../Shared/DropDown";

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

  const profile = {
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "kanishk",
  };
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex items-center gap-3 mb-3">
      <button onClick={() => dispatch(setShowProfile(true))}>
        <img
          src={profile.img}
          alt="user profile pic"
          className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0"
        />
      </button>

      <div className="relative grow">
        <input
          type="text"
          className="w-full bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)] shadow-sm dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] rounded focus:outline-none py-1 px-3 focus:shadow-lg"
          placeholder="Search..."
        />
        <BiSearch className="absolute right-3 top-2 text-[var(--text-secondary)]" />
      </div>

      <DropDown
        optionsList={menu_items}
        btnClassName={"flex items-center text-2xl py-1 text-[var(--text-secondary-light)] dark:text-[var(--text-secondary)] rounded-full data-[hover]:bg-[var(--accent-color-light)] dark:data-[hover]:bg-[var(--accent-color)] data-[open]:bg-[var(--accent-color-light)] dark:data-[open]:bg-[var(--accent-color)] data-[focus]:outline-1 data-[focus]:outline-white"}
        triggerElement={<BiDotsVerticalRounded />}
      />
    </div>
  );
};

export default ProfileAndSearch;
