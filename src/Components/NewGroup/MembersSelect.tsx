import { BiSearch } from "react-icons/bi";
import { Key, useState } from "react";
import { useSearchUsersQuery } from "../../apis/authApi";
import { FaArrowRight } from "react-icons/fa";
import SideHeader from "../Shared/SideHeader";

interface MembersSelectProps {
  title: string;
  backFn: Function;
  submitFn: () => void;
  appendFn: Function;
}

const MembersSelect: React.FC<MembersSelectProps> = ({ title, backFn, submitFn, appendFn }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    data: users,
    error,
    isLoading,
  } = useSearchUsersQuery(searchTerm, {
    skip: !searchTerm,
  });
  console.log(users);
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
  ];

  return (
    <div className="">
      <SideHeader
        title={title}
        backFn={backFn}
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
      <div>
        {isLoading ? (
          <p className="dark:text-text-primary text-text-primary-light">Loading...</p>
        ) : error ? (
          <p className="dark:text-text-primary text-text-primary-light">Error fetching users</p>
        ) : (
          <ul className="scrollbar-custom overflow-auto relative">
            {usersList?.map((user: { id: Key; name: string; img: string; email: string; }) => (
              <li key={user.id} onClick={() => appendFn(user)} className={`dark:text-text-primary text-text-primary-light text-lg flex items-center gap-5 p-3 w-full dark:hover:bg-accent-color hover:bg-accent-color-light hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg cursor-pointer`}>
                <img
                  src={user.img}
                  alt="user profile pic"
                  className="object-contain h-9 w-9 rounded-full items-start flex-shrink-0 "
                />
                <div className="grow">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{user.name}</span>
                    <span className="text-xs">{user.email}</span>
                  </div>
                </div>
              </li>
            ))}
            <button
              className="p-2 rounded-lg dark:bg-accent-color bg-accent-color-light dark:text-text-secondary text-text-secondary-light text-xl absolute right-3 bottom-2"
              onClick={submitFn}
            >
              <FaArrowRight />
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default MembersSelect;
