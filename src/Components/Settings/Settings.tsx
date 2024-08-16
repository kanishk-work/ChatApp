import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  setShowProfile,
  setShowSettings,
} from "../../Redux/slices/profileSlice";
import {
  FaBell,
  FaKeyboard,
  FaLock,
  FaPalette,
  FaQuestionCircle,
} from "react-icons/fa";
import {
  setShowHelp,
  setShowNotification,
  setShowPrivacy,
  setShowShortcuts,
  setShowTheme,
} from "../../Redux/slices/settingsSlice";
import SideHeader from "../Shared/SideHeader";
import Options from "../Shared/Options";
import KeyboardShortcuts from "../KeyShortcuts/KeyboardShortcuts";
import profilePlaceHolder from "./../../assets/profilePlaceHolder.jpg";

const Settings = () => {
  const dispatch = useAppDispatch();

  const settings_list = [
    {
      title: "notifications",
      icon: <FaBell />,
      action: () => dispatch(setShowNotification(true)),
    },
    {
      title: "privacy",
      icon: <FaLock />,
      action: () => dispatch(setShowPrivacy(true)),
    },
    {
      title: "theme",
      icon: <FaPalette />,
      action: () => dispatch(setShowTheme(true)),
    },
    {
      title: "keyboard shortcuts",
      icon: <FaKeyboard />,
      action: () => dispatch(setShowShortcuts(true)),
    },
    {
      title: "help",
      icon: <FaQuestionCircle />,
      action: () => dispatch(setShowHelp(true)),
    },
  ];

  const activeUser = useAppSelector((state) => state.activeUser);

  return (
    <div>
      <SideHeader
        backFn={() => dispatch(setShowSettings(false))}
        title="settings"
      />

      <button
        onClick={() => dispatch(setShowProfile(true))}
        className="w-full flex items-center gap-5 p-2 dark:hover:bg-[var(--accent-color)] hover:bg-[var(--accent-color-light)] rounded-lg"
      >
        <img
          src={
            (activeUser.profile_pic && activeUser.profile_pic) ||
            profilePlaceHolder
          }
          alt="user profile pic"
          className="object-contain h-16 w-16 rounded-full items-start flex-shrink-0"
        />
        <div className="capitalize text-left dark:text-[var(--text-primary)] text-[var(--text-primary-light)] leading-none">
          <h1 className="text-lg">{activeUser.full_name}</h1>
          <span className="text-sm dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)]">
            {activeUser.role}
          </span>
        </div>
      </button>
      <Options optionsList={settings_list} btnClassName="" btnStyle={{}} />
      <KeyboardShortcuts />
    </div>
  );
};

export default Settings;
