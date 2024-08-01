import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setShowProfile } from "../../Redux/slices/profileSlice";
import SideHeader from "../Shared/SideHeader";

const Profile = () => {
  const activeUser = useAppSelector((state) => state.activeUser);
  const dispatch = useAppDispatch();

  return (
    <div>
      <SideHeader
        title="profile"
        backFn={() => dispatch(setShowProfile(false))}
      />
      <div className="w-full flex items-center justify-center p-2 rounded-lg">
        <img
          src={activeUser.profilePic}
          alt="user profile pic"
          className="object-contain h-40 w-auto rounded-full flex-shrink-0"
        />
      </div>

      <div id="userinfo" className="capitalize  text-lg">
        <div className="flex flex-col items-start gap-2 p-3 w-full hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg">
          <span className="dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)]">
            name
          </span>
          <span className="dark:text-[var(--text-primary)] text-[var(--text-primary-light)]">
            {activeUser.name}
          </span>
        </div>
        <div className="flex flex-col items-start gap-2 p-3 w-full hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg">
          <span className="dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)]">
            bio
          </span>
          <span className="dark:text-[var(--text-primary)] text-[var(--text-primary-light)]">
            {activeUser.bio}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
