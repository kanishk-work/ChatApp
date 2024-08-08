import { FaPlus } from "react-icons/fa";
import SideHeader from "../Shared/SideHeader";

interface members {
  id: number;
  name: string;
  img: string;
  email: string;
}

const GroupProfile = ({
  backFn,
  submitFn,
  members,
}: {
  backFn: Function;
  submitFn: Function;
  members: members[];
}) => {
  return (
    <>
      <SideHeader title="group profile" backFn={backFn} />

      <div className="w-full flex items-center justify-center p-2 rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user profile pic"
          className="object-contain h-40 w-auto rounded-full flex-shrink-0"
        />
      </div>

      <div id="groupinfo" className="capitalize text-lg">
        <div className="flex flex-col items-start gap-2 p-3 w-full hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg">
          <span className="dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)]">
            group name
          </span>
          <span className="dark:text-[var(--text-primary)] text-[var(--text-primary-light)]">
            Group 1
          </span>
        </div>
        <div className="flex flex-col items-start gap-2 p-3 w-full hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg">
          <span className="dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)]">
            bio
          </span>
          <span className="dark:text-[var(--text-primary)] text-[var(--text-primary-light)]">
            new group
          </span>
        </div>
        <div className="flex flex-col items-start gap-2 p-3 w-full hover:shadow-[0px_0px_20px_0px_#00000024] rounded-lg">
          <span className="dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)]">
            members
          </span>
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
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="p-3 rounded-full hover:bg-accent-color">
          <FaPlus className="text-lg dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)]" />
        </button>
      </div>
    </>
  );
};

export default GroupProfile;
