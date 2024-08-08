import React from "react";
import { FaStar, FaImage, FaInfoCircle, FaBan } from "react-icons/fa";
import { useAppDispatch } from "../../Redux/hooks";
import { setShowChatInfo } from "../../Redux/slices/chatInfoSlice";
import { RxCross2 } from "react-icons/rx";

interface UserProfileProps {
  userProfileImage?: string;
  userName: string;
  userBio: string;
  media: string[];
  starredMessages: string[];
  onBlockUser: () => void;
  profileOptions?: {
    name: string;
    icon?: JSX.Element;
    action?: () => void;
  }[];
}

const UserProfile: React.FC<UserProfileProps> = ({
  userProfileImage,
  userName,
  userBio,
  media,
  starredMessages,
  onBlockUser,
  profileOptions = [
    { name: "Starred Messages", icon: <FaStar /> },
    { name: "Shared Media", icon: <FaImage /> },
    { name: "User Details", icon: <FaInfoCircle /> },
  ],
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="p-4  w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg h-full">
      <div className="flex items-center">
        <img
          src={userProfileImage}
          alt={userName}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold dark:text-white">{userName}</h2>
          <p className="text-gray-500 dark:text-gray-400">{userBio}</p>
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
        <h3 className="text-lg font-semibold dark:text-white">Media</h3>
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
          onClick={onBlockUser}
        >
          <FaBan className="mr-2" />
          Block User
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
