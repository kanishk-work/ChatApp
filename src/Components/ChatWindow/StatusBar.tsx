import { FC } from "react";
import { Styles, applyStyles } from "../../Utils/styleUtils";

interface StatusBarStyles {
  container?: Styles;
  userName?: Styles;
  activityStatus?: Styles;
}

interface StatusBarProps {
  statusBarStyles?: StatusBarStyles;
}

const StatusBar: FC<StatusBarProps> = ({ statusBarStyles }) => {
  const containerStyles = applyStyles(statusBarStyles?.container);
  const userNameStyles = applyStyles(statusBarStyles?.userName);
  const activityStyles = applyStyles(statusBarStyles?.activityStatus);

  return (
    <div
      className={`flex items-center p-4 bg-gray-800 text-white ${containerStyles.className}`}
      style={containerStyles.style}
    >
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
