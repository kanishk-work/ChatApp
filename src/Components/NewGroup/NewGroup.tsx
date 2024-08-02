import { useAppDispatch } from "../../Redux/hooks";
import { setShowNewGroup } from "../../Redux/slices/profileSlice";
import SideHeader from "../Shared/SideHeader";

const NewGroup = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <SideHeader title="new group" backFn={() => dispatch(setShowNewGroup(false))} />
      
    </div>
  );
};

export default NewGroup;
