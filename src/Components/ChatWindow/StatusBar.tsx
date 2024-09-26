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
      className={`flex items-center p-4 bg-gray-800 text-white ${containerStyles.className}`}
      style={containerStyles.style}
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
      <div
        className="flex items-center gap-5"
        onClick={() => dispatch(setShowChatInfo(true))}
      >
        <img
          src={userProfilePic}
          alt="User profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
        <div className="cursor-pointer">
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
    </div>
  );
};

export default StatusBar;
