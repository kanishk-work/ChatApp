import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setShowProfile } from "../../Redux/slices/profileSlice";
import { formatDate } from "../../Utils/formatDate";
import SideHeader from "../Shared/SideHeader";
import profilePlaceHolder from "./../../assets/profilePlaceHolder.jpg";

const Profile = () => {
  const activeUser = useAppSelector((state) => state.activeUser);
  const dispatch = useAppDispatch();
  const formattedDate = formatDate(activeUser.createdAt, "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <SideHeader
        title="profile"
        backFn={() => dispatch(setShowProfile(false))}
      />
      <div className="w-full flex items-center justify-center p-2 rounded-lg">
        <img
          src={
            (activeUser.profile_pic && activeUser.profile_pic) ||
            profilePlaceHolder
          }
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
            {activeUser.full_name}
          </span>
        </div>
        <div className="flex flex-col items-start gap-2 p-3 w-full hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg">
          <span className="dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)]">
            Date joined
          </span>
          <span className="dark:text-[var(--text-primary)] text-[var(--text-primary-light)]">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
