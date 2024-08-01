import { useAppDispatch } from "../../Redux/hooks";
import { setShowNotification } from "../../Redux/slices/settingsSlice";
import SideHeader from "../Shared/SideHeader";
const Notification = () => {
    const dispatch = useAppDispatch();
    return (
      <div>
        <SideHeader title="notifications" backFn={() => dispatch(setShowNotification(false))} />
          
      </div>
    );
}

export default Notification