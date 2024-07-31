import { FC } from "react";
import { Styles, applyStyles } from "../../utils/styleUtils";

interface StatusBarProps {
  statusBarStyles?: Styles;
}

const StatusBar: FC<StatusBarProps> = ({ statusBarStyles }) => {
  const { className, style } = applyStyles(statusBarStyles);
  return (
    <div className="flex items-center p-4 bg-gray-800 text-white" style={style}>
      <img
        src="https://via.placeholder.com/40"
        alt="User profile"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <div className="font-bold">User Name</div>
        <div className="text-sm">Active now</div>
      </div>
    </div>
  );
};

export default StatusBar;
