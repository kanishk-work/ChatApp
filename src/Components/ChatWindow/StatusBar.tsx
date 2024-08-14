import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { FaChevronLeft } from "react-icons/fa";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setActiveChatId } from "../../Redux/slices/chatsSlice";
import { RootState } from "../../Redux/store";
import { useWindowSize } from "../../Utils/windowSizeUtil";
import { setShowChatInfo } from "../../Redux/slices/chatInfoSlice";

interface StatusBarStyles {
  container?: Styles;
  userName?: Styles;
  activityStatus?: Styles;
  backBtn?: Styles;
}

interface StatusBarProps {
  statusBarStyles?: StatusBarStyles;
}

const StatusBar: FC<StatusBarProps> = ({ statusBarStyles }) => {
  const containerStyles = applyStyles(statusBarStyles?.container);
  const userNameStyles = applyStyles(statusBarStyles?.userName);
  const activityStyles = applyStyles(statusBarStyles?.activityStatus);
  const backBtnStyles = applyStyles(statusBarStyles?.backBtn);

  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );

  const chats = useAppSelector((state: RootState) => state.chats.chats);
  const activeChat = chats.find((chat)=> chat.id===activeChatId);

  const { width, height } = useWindowSize();
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
          src="https://via.placeholder.com/40"
          alt="User profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
        <div className="cursor-pointer">
          <div
            className={`font-bold ${userNameStyles.className}`}
            style={userNameStyles.style}
          >
            {activeChatId && activeChat?.name}
          </div>
          <div
            className={`text-sm ${activityStyles.className}`}
            style={activityStyles.style}
          >
            {activeChatId && activeChat?.status || 'status unavailable'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
