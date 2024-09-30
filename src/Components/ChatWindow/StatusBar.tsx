import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { FaChevronLeft } from "react-icons/fa";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setActiveChatId } from "../../Redux/slices/chatsSlice";
import { RootState } from "../../Redux/store";
import { useWindowSize } from "../../Utils/windowSizeUtil";
import { setShowChatInfo } from "../../Redux/slices/chatInfoSlice";
import placeholderImage from "./../../assets/profilePlaceHolder.jpg";
import { Chat } from "../../Types/chats";
import { shallowEqual } from "react-redux";
import DropDown from "../Shared/DropDown";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useExitGroupMutation } from "../../apis/chatApi";
import { useToast } from "../Shared/Toast/ToastProvider";

interface StatusBarStyles {
  container?: Styles;
  userName?: Styles;
  activityStatus?: Styles;
  backBtn?: Styles;
}

interface StatusBarProps {
  activeChat: Chat | undefined;
  statusBarStyles?: StatusBarStyles;
}

const StatusBar: FC<StatusBarProps> = ({ activeChat, statusBarStyles }) => {
  const containerStyles = applyStyles(statusBarStyles?.container);
  const userNameStyles = applyStyles(statusBarStyles?.userName);
  const activityStyles = applyStyles(statusBarStyles?.activityStatus);
  const backBtnStyles = applyStyles(statusBarStyles?.backBtn);
  const { showToast } = useToast();

  const [exitGroup] = useExitGroupMutation();

  const handleExitGroup = async (chatRoomId: number | undefined) => {
    if(chatRoomId === undefined) return;
    
    if (confirm("Press a button!") === true) {
      const {data: res, error} = await exitGroup({ chat_room_id: chatRoomId })

      if(res){
        showToast("Exited group");
        dispatch(setChatWindow(null));
        dispatch(setShowChatInfo(false));
        dispatch(setActiveChatId(null));
      } else if (error){
        console.error("Failed to exit group:", error);
        showToast("Failed to exit group");
      } else {
        showToast("Failed to exit group");
      }
    }
  };
  const menu_items = [
    {
      name: "Group Info",
      action: () => {},
    },
    {
      name: "Exit Group",
      action: () => {handleExitGroup(activeChat?.id)},
    },
  ];

  const dispatch = useAppDispatch();

  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id,
    shallowEqual
  );

  // Set the default (group) chat name, status, and profile picture
  let chatName = activeChat?.name || "";
  let userStatus = "status unavailable";
  let userProfilePic = activeChat?.profile_pic || placeholderImage;

  if (activeChat) {
    if (activeChat.is_group) {
      // Group members except the active user
      userStatus = "Members: " + activeChat.chatUsers.length;
      // userStatus =
      //   "Members: " +
      //   activeChat.chatUsers.filter(
      //     (chatUser) => chatUser.user.id !== activeUserId
      //   ).length;
      // .map((chatUser) => chatUser.user.full_name)
      // .join(", ") || "No other users";
    } else {
      const otherUser = activeChat.chatUsers.find(
        (chatUser) => chatUser.user.id !== activeUserId
      );
      // Set the chat name, status, and profile picture for one-one chat
      if (otherUser) {
        chatName = otherUser.user.full_name;
        userStatus = otherUser.user.status || userStatus;
        userProfilePic = otherUser.user.profile_pic || userProfilePic;
      }
    }
  }

  const { width } = useWindowSize();

  return (
    <div
      className={`flex items-center justify-between p-4 bg-gray-800 text-white ${containerStyles.className}`}
      style={containerStyles.style}
    >
      <div
        className="flex items-center gap-5 cursor-pointer flex-grow"
        onClick={() => dispatch(setShowChatInfo(true))}
      >
        {width < 764 && (
        <button
          onClick={() => {
            dispatch(setChatWindow(false));
            dispatch(setActiveChatId(null));
          }}
          style={backBtnStyles.style}
          className={`${backBtnStyles.className} dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] hover:bg-[var(--accent-color-light)] dark:hover:bg-[var(--accent-color)] rounded-full p-2`}
        >
          <FaChevronLeft />
        </button>
      )}
        <img
          src={userProfilePic}
          alt="User profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div
            className={`font-bold ${userNameStyles.className}`}
            style={userNameStyles.style}
          >
            {chatName}
          </div>
          <div
            className={`text-sm ${activityStyles.className}`}
            style={activityStyles.style}
          >
            {userStatus}
          </div>
        </div>
      </div>
      <DropDown
        optionsList={menu_items}
        dropdownStyle={
          "flex items-center text-2xl py-1 text-[var(--text-secondary-light)] dark:text-[var(--text-secondary)] rounded-full data-[hover]:bg-[var(--accent-color-light)] dark:data-[hover]:bg-[var(--accent-color)] data-[open]:bg-[var(--accent-color-light)] dark:data-[open]:bg-[var(--accent-color)] data-[focus]:outline-1 data-[focus]:outline-white"
        }
        triggerElement={<BiDotsVerticalRounded />}
        dropdownClassStyle={"right-0"}
      />
    </div>
  );
};

export default StatusBar;
