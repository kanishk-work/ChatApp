import { useAppDispatch } from "../../Redux/hooks";
import { setShowNewGroup } from "../../Redux/slices/profileSlice";
import { useState } from "react";
import MembersSelect from "./MembersSelect";
import GroupProfile from "./GroupProfile";
import SideHeader from "../Shared/SideHeader";
import { FaArrowRight } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useSearchUsersQuery } from "../../apis/authApi";

interface members {
  id: number;
  name: string;
  img: string;
  email: string;
}

const NewGroup = () => {
  const [showGroupProfile, setShowGroupProfile] = useState(false);
  const [members, setMembers] = useState<members[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useAppDispatch();

  const {
    data: users,
    error,
    isLoading,
  } = useSearchUsersQuery(searchTerm, {
    skip: !searchTerm,
  });
  console.log(users);

  const selectHandler = (newMember: members) => {
    setMembers([...members, newMember]);
  };
  console.log(members);

  const usersList = [
    {
      id: 1,
      name: "user1",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "user2",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "user1",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "user2",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 9,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 10,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 11,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 12,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 13,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 14,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 15,
      name: "user3",
      email: "abc@email.com",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div>
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
                  src={member.img}
                  alt="user profile pic"
                  className="object-contain h-9 w-9 rounded-full"
                />
              </div>
            ))}
          </div>

          <div>
            {isLoading ? (
              <p className="dark:text-text-primary text-text-primary-light">
                Loading...
              </p>
            ) : error ? (
              <p className="dark:text-text-primary text-text-primary-light">
                Error fetching users
              </p>
            ) : (
              <ul className="scrollbar-custom overflow-auto relative">
                {usersList?.map(
                  (user: members) => (
                    <li
                      key={user.id}
                      onClick={() => selectHandler(user)}
                      className={`dark:text-text-primary text-text-primary-light text-lg flex items-center gap-5 p-3 w-full dark:hover:bg-accent-color hover:bg-accent-color-light hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg cursor-pointer`}
                    >
                      <img
                        src={user.img}
                        alt="user profile pic"
                        className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 "
                      />
                      <div className="grow">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">
                            {user.name}
                          </span>
                          <span className="text-xs">{user.email}</span>
                        </div>
                      </div>
                    </li>
                  )
                )}
                <button
                  className="p-2 rounded-lg dark:bg-accent-color bg-accent-color-light dark:text-text-secondary text-text-secondary-light text-xl absolute right-3 bottom-2"
                  onClick={() => {
                    setShowGroupProfile(true);
                  }}
                >
                  <FaArrowRight />
                </button>
              </ul>
            )}
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
