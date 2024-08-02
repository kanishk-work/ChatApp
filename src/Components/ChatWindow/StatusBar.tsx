import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";
import { FaChevronLeft } from "react-icons/fa";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import { useAppDispatch } from "../../Redux/hooks";
import { setActiveChat } from "../../Redux/slices/chatsSlice";

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

  return (
    <div
      className={`flex items-center p-4 bg-gray-800 text-white ${containerStyles.className}`}
      style={containerStyles.style}
    >
      <button
        onClick={() => {
          dispatch(setChatWindow(false));
          dispatch(setActiveChat(null));
        }}
        style={backBtnStyles.style}
        className={`${backBtnStyles.className} dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] hover:bg-[var(--accent-color-light)] dark:hover:bg-[var(--accent-color)] rounded-full p-2`}
      >
        <FaChevronLeft />
      </button>
      <img
        src="https://via.placeholder.com/40"
        alt="User profile"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <div
          className={`font-bold ${userNameStyles.className}`}
          style={userNameStyles.style}
        >
          User Name
        </div>
        <div
          className={`text-sm ${activityStyles.className}`}
          style={activityStyles.style}
        >
          Active now
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
