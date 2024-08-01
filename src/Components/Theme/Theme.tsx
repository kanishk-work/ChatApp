import { useAppDispatch } from "../../Redux/hooks";
import SideHeader from "../Shared/SideHeader";
import { setShowTheme } from "../../Redux/slices/settingsSlice";

const Theme = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <SideHeader title="theme" backFn={() => dispatch(setShowTheme(false))} />
    </div>
  );
};

export default Theme;
