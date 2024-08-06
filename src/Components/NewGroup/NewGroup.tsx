import { useAppDispatch } from "../../Redux/hooks";
import { setShowNewGroup } from "../../Redux/slices/profileSlice";
import SideHeader from "../Shared/SideHeader";
import { useState } from "react";
import AddMembers from "./AddMembers";
import GroupProfile from "./GroupProfile";

const NewGroup = () => {
  const [addMembers, setAddMembers] = useState(true);
  const [groupProfile, setGroupProfile] = useState(true);
  const [members, setMembers] = useState([]);

  const append = (newMember:never) =>{
    setMembers([...members, newMember])
  }
  console.log(members);
  
  const dispatch = useAppDispatch();
  return (
    <div>
      <SideHeader
        title="new group"
        backFn={() => dispatch(setShowNewGroup(false))}
      />
      {addMembers ? (
        <AddMembers appendFn={append} submitFn={() => setAddMembers(false)} />
      ) : (
        groupProfile && (
          <GroupProfile
            submitFn={() => {
              setGroupProfile(false);
              dispatch(setShowNewGroup(false));
            }}
          />
        )
      )}
    </div>
  );
};

export default NewGroup;
