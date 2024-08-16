import { FaCheck, FaPlus } from "react-icons/fa";
import SideHeader from "../Shared/SideHeader";
import { useCreateGroupMutation, useGetChatsQuery } from "../../apis/chatApi";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setActiveChatId } from "../../Redux/slices/chatsSlice";
import { setChatWindow } from "../../Redux/slices/chatWindowSlice";
import { RootState } from "../../Redux/store";
import Loader from "../Shared/Loader";

interface usersData {
  id: number;
  full_name: string;
  short_name: string;
  role: string;
  profile_pic: string;
}

const GroupProfile = ({
  backFn,
  submitFn,
  members,
}: {
  backFn: Function;
  submitFn: Function;
  members: usersData[];
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const membersIds = members.map((member) => member.id);
  const { refetch: refetchChats } = useGetChatsQuery();
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );

  const body = {
    toUsersList: membersIds,
    group_name: groupName,
  };
  console.log(body);
  const [createGroup] = useCreateGroupMutation();

  const handleSubmit = async (body: Object) => {
    setIsLoading(true);

    const { data: res, error } = await createGroup(body);

    if (error) {
      console.log(error);
    } else {
      await refetchChats();
      submitFn();
      console.log(res);
      if (activeChatId !== res?.newChatRoom?.id) {
        dispatch(setActiveChatId(res?.newChatRoom?.id));
        dispatch(setChatWindow(true));
        // joinRoom(chatId);
      }
      console.log(res?.newChatRoom);
    }

    setIsLoading(false);
  };

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
          <input
            type="text"
            placeholder="Enter group name"
            className="w-full bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)] shadow-sm dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] rounded focus:outline-none py-1 px-3 focus:shadow-lg"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
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
                  src={member.profile_pic}
                  alt="user profile pic"
                  className="object-contain h-9 w-9 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {isLoading ? (
          <Loader loaderStyles={'text-focus-secondary'}/>
        ) : (
          <button
            onClick={() => handleSubmit(body)}
            className="p-3 rounded-full hover:bg-accent-color"
          >
            <FaCheck className="text-lg dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)]" />
          </button>
        )}
      </div>
    </>
  );
};

export default GroupProfile;
