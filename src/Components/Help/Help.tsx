import {
  FaExclamationCircle,
  FaFileAlt,
  FaQuestionCircle,
  FaUsers,
} from "react-icons/fa";
import { useAppDispatch } from "../../Redux/hooks";
import { setShowHelp } from "../../Redux/slices/settingsSlice";
import SideHeader from "../Shared/SideHeader";
import Options from "../Shared/Options";

const Help = () => {
  const help_list = [
    {
      title: "help center",
      icon: <FaQuestionCircle />,
      action: () => {},
    },
    {
      title: "contact us",
      icon: <FaUsers />,
      action: () => {},
    },
    {
      title: "privacy policy",
      icon: <FaFileAlt />,
      action: () => {},
    },
    {
      title: "report",
      icon: <FaExclamationCircle />,
      action: () => {},
    },
  ];

  const dispatch = useAppDispatch();
  return (
    <div>
      <SideHeader backFn={() => dispatch(setShowHelp(false))} title="help" />

      <Options optionsList={help_list} btnClassName="hover:bg-green-600" />
    </div>
  );
};

export default Help;
