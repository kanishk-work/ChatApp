import { useAppDispatch } from "../../Redux/hooks";
import { setShowPrivacy } from "../../Redux/slices/settingsSlice";
import SideHeader from "../Shared/SideHeader";
const Privacy = () => {
    const dispatch = useAppDispatch();
    return (
      <div>
        <SideHeader title="privacy" backFn={() => dispatch(setShowPrivacy(false))} />
            
      </div>
    );
}

export default Privacy