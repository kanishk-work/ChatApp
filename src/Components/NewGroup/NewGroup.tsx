import { useAppDispatch } from "../../Redux/hooks";
import { setShowNewGroup } from "../../Redux/slices/profileSlice";
import { useState } from "react";
import GroupProfile from "./GroupProfile";
import SideHeader from "../Shared/SideHeader";
import { FaArrowRight, FaExclamationCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useSearchUsersQuery } from "../../apis/authApi";
import { useDebounce } from "../../Utils/CustomHooks/useDebounce";
import SearchBar from "../SearchBar/SearchBar";

interface usersData {
  id: number;
  full_name: string;
  short_name: string;
  role: string;
  profile_pic: string;
  notif_room: string;
}

const NewGroup = () => {
  const [showGroupProfile, setShowGroupProfile] = useState(false);
  const [members, setMembers] = useState<usersData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAddAlert, setShowAddAlert] = useState<boolean>(false);


  const dispatch = useAppDispatch();
  const debounceSearch = useDebounce(searchTerm, 500);

  const {
    data: users,
    error,
    isLoading,
  } = useSearchUsersQuery(debounceSearch, {
    skip: !debounceSearch,
  });
  console.log(users?.list);
  // console.log(error);

  const selectHandler = (newMember: usersData) => {
    if (newMember !== members.find(member => member.id === newMember.id)) {
      setMembers([...members, newMember]);
    }
    else {
      setShowAddAlert(true);
      setTimeout(() => setShowAddAlert(false), 2000);
    }
  };

  const deleteItem = (memberRem: usersData) => {
    const newMembers = members.filter((member) => member.id !== memberRem.id);
    setMembers(newMembers);
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
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            searchBarStyles={'mb-2'}
          />

          <div className="flex flex-wrap items-center p-1.5 gap-1.5 rounded-lg shadow-[inset_0px_0px_20px_0px_#00000024]">
            {members?.map((member) => (
              <div key={member.id} className="relative p-1.5 dynamic-notif rounded-full">
                <img
                  src={member.profile_pic}
                  alt="user profile pic"
                  className="object-contain h-9 w-9 rounded-full"
                />
                <GiCancel onClick={() => deleteItem(member)} className="absolute right-0 bottom-0" />
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
              <div className="transition-all ease-in-out delay-150 p-1 rounded-lg dynamic-notif text-base">
                <span className="flex items-center gap-2">
                  <FaExclamationCircle />
                  Members not selected
                </span>
              </div>
            )}
            {showAddAlert && (
              <div className="transition-all ease-in-out delay-150 p-1 rounded-lg dynamic-notif text-base">
                <span className="flex items-center gap-2">
                  <FaExclamationCircle />
                  Member already selected
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
