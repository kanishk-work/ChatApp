import React, { useState } from "react";
import { FaChevronDown, FaDownload, FaFile } from "react-icons/fa";
import DropDown from "../Shared/DropDown";
import { ChatMessage } from "../../Types/chats";

interface MessageBubbleProps {
  message: ChatMessage;
  parentMessage: ChatMessage | undefined;
  sender: "user" | "other";
  senderName: string | undefined;
  setReplyMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>
  bubbleStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  parentMessage,
  sender,
  senderName,
  setReplyMessage, // Pass down the setReplyMessage from ChatWindow
  bubbleStyle,
  textStyle,
}) => {
  const messageOptions = [
    {
      name: "Reply",
      action: () => {
        setReplyMessage(message); // Set the reply message
      },
    },
    {
      name: "Download",
      action: () => console.log("Download option selected"),
    },
  ];
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleDownload = (fileUrl: string) => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "downloaded_file"; // Set a proper file name if available
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

  const getFilePreview = (fileUrl: string) => {
    if (fileUrl.startsWith("blob:")) {
      return (
        <div className="flex items-center space-x-2">
          <div>
            <img src={fileUrl} className="block h-64" alt="File Preview" />
            <button
              onClick={() => handleDownload(fileUrl)}
              className="text-blue-500 hover:underline mt-1 flex items-center"
            >
              <FaDownload className="text-black" />
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2">
          <div>
            <span className="block text-sm text-gray-700">{fileUrl}</span>
            <button
              onClick={() => handleDownload(fileUrl)}
              className="text-blue-500 hover:underline mt-1 flex items-center"
            >
              <FaDownload className="" />
            </button>
          </div>
        </div>
      );
    }
  };

  const renderMessageContent = () => {
    return (
      <div className="flex flex-col gap-3 items-center">
        {message.chatFiles &&
          message.chatFiles.map((fileUrl, index) => (
            <div key={index} className="mb-2">
              {getFilePreview(fileUrl)}
            </div>
          ))}
        {parentMessage && (
          <span className="w-full text-center dynamic-accent-color py-2 px-4 rounded-lg" style={textStyle}>{parentMessage.message}</span>
        )}
        <span style={textStyle}>{message.message}</span>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col ${sender === "user" ? "items-end" : "items-start"
        } mb-2`}
    >
      {sender === "other" && <span className="dynamic-text-color-secondary">{senderName}</span> }
      
      <div
        className={`max-w-[70%] rounded-lg px-5 py-1 relative group ${sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
          }`}
        style={bubbleStyle}
      >
        <div className={`flex text-xs justify-end absolute top-0 ${sender === "user" ? "left-0" : "right-0"} cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
          <DropDown
            optionsList={messageOptions}
            triggerElement={<FaChevronDown />}
            btnClassName={`flex items-center dynamic-accent-color p-1 dynamic-text-color-primary ${sender === "user" ? "rounded-br-lg" : "rounded-bl-lg"}`}
            dropBoxClassName={`${sender === "user" ? "right-0" : "left-0"}`}
          />
        </div>
        {renderMessageContent()}
      </div>
    </div>
  );
};

export default MessageBubble;
