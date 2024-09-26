import React, { useEffect, useState } from "react";
import { FaStar, FaImage, FaInfoCircle, FaBan, FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { setShowChatInfo } from "../../Redux/slices/chatInfoSlice";
import { RxCross2 } from "react-icons/rx";
import { RootState } from "../../Redux/store";
import placeholderImage from "./../../assets/profilePlaceHolder.jpg";
import { Chat } from "../../Types/chats";
import { deleteGroupMemberData, getChatData } from "../../DB/database";
import { useToast } from "../Shared/Toast/ToastProvider";
import { useDeleteGroupMemberMutation } from "../../apis/chatApi";
import { shallowEqual } from "react-redux";

interface UserProfileProps {
  media: string[];
  starredMessages: string[];
  profileOptions?: {
    name: string;
    icon?: JSX.Element;
    action?: () => void;
  }[];
}

const UserProfile: React.FC<UserProfileProps> = ({
  media,
  starredMessages,
  profileOptions = [
    { name: "Starred Messages", icon: <FaStar /> },
    { name: "Shared Media", icon: <FaImage /> },
    { name: "User Details", icon: <FaInfoCircle /> },
  ],
}) => {
  const [activeChat, setActiveChat] = useState<Chat>();
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId,
    shallowEqual
  );

  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id,
    shallowEqual
  );

  // Set the chat name, status, and profile picture
  let chatName = activeChat?.name || "";
  let userStatus = "status unavailable";
  let userProfilePic = activeChat?.profile_pic || placeholderImage;
  const [deleteMember] = useDeleteGroupMemberMutation();

  if (activeChat) {
    if (activeChat.is_group) {
      // Group members except the active user
      userStatus = "Members: " + activeChat.chatUsers.length;
      // userStatus =
      // "Members: " +
      // activeChat.chatUsers.filter(
      //   (chatUser) => chatUser.user.id !== activeUserId
      // ).length;
      // .map((chatUser) => chatUser.user.full_name)
      // .join(", ") || "No other users";
    } else {
      const otherUser = activeChat.chatUsers.find(
        (chatUser) => chatUser.user.id !== activeUserId
      );

      if (otherUser) {
        chatName = otherUser.user.full_name;
        userStatus = otherUser.user.status || userStatus;
        userProfilePic = otherUser.user.profile_pic || userProfilePic;
      }
    }
  }

  useEffect(() => {
    const getActiveChat = async () => {
      if (activeChatId !== null) {
        const activeChatFetched = await getChatData(activeChatId);
        if (activeChatFetched) {
          setActiveChat(activeChatFetched);
        } else {
          console.warn(`No chats found for this id: ${activeChatId}`);
        }
      }
    };

    getActiveChat();
  }, [activeChatId]);

  const { showToast } = useToast();

  const handleBlockUser = () => {
    showToast("Block user triggered");
  };

  const handleDeleteUser = async (deleteData: {
    chat_room_id: number | null;
    user_id: number | null;
  }) => {
    showToast("Delete user triggered");
    try {
      const res = await deleteMember(deleteData);
      if (res) {
        showToast("User deleted successfully");
        //remove member from list using setActiveChat state
        if (activeChat) {
          const updatedChatUsers = activeChat?.chatUsers.filter(
            (chatUser) => chatUser.user.id !== deleteData.user_id
          );
          setActiveChat({ ...activeChat, chatUsers: updatedChatUsers });
          await deleteGroupMemberData(
            deleteData.chat_room_id,
            deleteData.user_id
          );
          // update the chat in indexedDB
          // await updateChatData(activeChat);
        }
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
      showToast("Error deleting user. Please try again later.");
    }
  };

  return (
    <div className="p-4 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg h-full relative">
      <div className="flex items-center">
        <img
          src={userProfilePic}
          alt={chatName}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold dark:text-white">{chatName}</h2>
          <p className="text-gray-500 dark:text-gray-400">{userStatus}</p>
        </div>
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => dispatch(setShowChatInfo(false))}
        >
          <RxCross2
            className="text-white text-xl"
            onClick={() => dispatch(setShowChatInfo(false))}
          />
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold dark:text-white">Options</h3>
        <ul className="mt-2">
          {profileOptions.map((option, index) => (
            <li key={index} className="flex items-center mt-2">
              <span className="mr-2">{option.icon}</span>
              <button
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                onClick={option.action}
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold dynamic-text-color-primary">
          Media
        </h3>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {media.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Shared media"
              className="w-full h-20 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {activeChat?.is_group && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold dynamic-text-color-secondary">
            {userStatus}
          </h3>
          {activeChat?.chatUsers?.map((chatUser, index) => (
            <div
              key={index}
              className="mt-2 flex items-center gap-3 dynamic-text-color-primary"
              onClick={() => dispatch(setShowChatInfo(true))}
            >
              <img
                src={chatUser.user.profile_pic || placeholderImage}
                alt="User profile"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <div className="cursor-pointer w-full">
                <div className={`flex items-center justify-between`}>
                  <span>{chatUser.user.full_name}</span>
                  {chatUser.is_group_admin ? (
                    <span className="rounded-md dynamic-notif px-2 py-0.5 text-xs ring-1 ring-inset ring-focus-secondary">
                      Group Admin
                    </span>
                  ) : (
                    <button
                      className="flex items-center text-red-600 hover:text-red-800"
                      onClick={() =>
                        handleDeleteUser({
                          chat_room_id: activeChatId,
                          user_id: chatUser.user_id,
                        })
                      }
                    >
                      <FaTrash className="mr-2" />
                      Delete User
                    </button>
                  )}
                </div>
                <div className={`text-sm`}>
                  <span>{chatUser.user.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold dark:text-white">
          Starred Messages
        </h3>
        <ul className="mt-2">
          {starredMessages.map((message, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-300">
              {message}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <button
          className="flex items-center text-red-600 hover:text-red-800"
          onClick={handleBlockUser}
        >
          <FaBan className="mr-2" />
          Block User
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
