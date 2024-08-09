import { useAppDispatch } from "../../Redux/hooks";
import { setShowNewGroup } from "../../Redux/slices/profileSlice";
import { useState } from "react";
import MembersSelect from "./MembersSelect";
import GroupProfile from "./GroupProfile";
import SideHeader from "../Shared/SideHeader";
import { FaArrowRight, FaExclamationCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useSearchUsersQuery } from "../../apis/authApi";

interface usersData {
  id: number;
  full_name: string;
  short_name: string;
  role: string;
  profile_pic: string;
}

const NewGroup = () => {
  const [showGroupProfile, setShowGroupProfile] = useState(false);
  const [members, setMembers] = useState<usersData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {
    data: users,
    error,
    isLoading,
  } = useSearchUsersQuery(searchTerm, {
    skip: !searchTerm,
  });
  console.log(users?.list);
  console.log(error);

  const selectHandler = (newMember: usersData) => {
    setMembers([...members, newMember]);
  };
  console.log(members);

  const nextHandler = () => {
    if (!members.length) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      setShowGroupProfile(true);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-auto relative">
      {!showGroupProfile ? (
        <>
          <SideHeader
            title="new group"
            backFn={() => dispatch(setShowNewGroup(false))}
          />
          <div className="relative mb-2">
            <input
              type="text"
              className="w-full bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)] shadow-sm dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] rounded focus:outline-none py-1 px-3 focus:shadow-lg"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BiSearch className="absolute right-3 top-2 text-text-secondary" />
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-lg shadow-[inset_0px_0px_20px_0px_#00000024]">
            {members?.map((member) => (
              <div key={member.id}>
                <img
                  src={member.profile_pic}
                  alt="user profile pic"
                  className="object-contain h-9 w-9 rounded-full"
                />
              </div>
            ))}
          </div>

          {searchTerm?.length < 2 ? (
            <p className="dark:text-text-primary text-text-primary-light">
              Enter atleast 2 letters to search
            </p>
          ) : isLoading ? (
            <p className="dark:text-text-primary text-text-primary-light">
              Loading...
            </p>
          ) : error ? (
            <p className="dark:text-text-primary text-text-primary-light">
              Error {error?.data?.message}
            </p>
          ) : !users?.list?.length ? (
            <p className="dark:text-text-primary text-text-primary-light">
              Users not found
            </p>
          ) : (
            <ul className="scrollbar-custom overflow-auto">
              {users?.list.map((user: usersData) => (
                <li
                  key={user.id}
                  onClick={() => selectHandler(user)}
                  className={`dark:text-text-primary text-text-primary-light text-lg flex items-center gap-5 p-3 w-full dark:hover:bg-accent-color hover:bg-accent-color-light hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg cursor-pointer`}
                >
                  <img
                    src={user.profile_pic}
                    alt="user profile pic"
                    className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 "
                  />
                  <div className="grow">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">
                        {user.full_name} ({user.role})
                      </span>
                      <span className="text-xs">{user.short_name}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2 items-center absolute right-3 bottom-2">
            {showAlert && (
              <div className="transition-all ease-in-out delay-150 p-1 rounded-lg bg-focus-secondary text-focus-primary text-base">
                <span className="flex items-center gap-2">
                  <FaExclamationCircle />
                  At least 1 member must be selected
                </span>
              </div>
            )}

            <button
              className="p-2 rounded-lg dark:bg-accent-color bg-accent-color-light dark:text-text-secondary text-text-secondary-light text-xl"
              onClick={() => {
                nextHandler();
              }}
            >
              <FaArrowRight />
            </button>
          </div>
        </>
      ) : (
        <GroupProfile
          submitFn={() => {
            setShowGroupProfile(false);
            dispatch(setShowNewGroup(false));
          }}
          members={members}
          backFn={() => setShowGroupProfile(false)}
        />
      )}
    </div>
  );
};

export default NewGroup;
