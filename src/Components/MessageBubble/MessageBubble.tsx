import React, { useState } from "react";
import { FaChevronDown, FaDownload, FaFile } from "react-icons/fa";
import DropDown from "../Shared/DropDown";

interface MessageBubbleProps {
  message: {
    messageId:number;
    textMessage: string;
    file: string[] | null; // Change from string to string[]
  };
  sender: "user" | "other";
  setIsReply: React.Dispatch<React.SetStateAction<boolean>>
  setReplyMessage: React.Dispatch<React.SetStateAction<{
    messageId: number;
    textMessage: string;
    sender: "user" | "other";
} | null>>
  bubbleStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  setIsReply,
  message,
  sender,
  setReplyMessage, // Pass down the setReplyMessage from ChatWindow
  bubbleStyle,
  textStyle,
}) => {

  const messageOptions = [
    {
      name: "Reply",
      action: () => {
        setIsReply(true);
        setReplyMessage({ messageId:message.messageId, textMessage: message.textMessage, sender }); // Set the reply message
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
      <div>
        {message.file &&
          message.file.map((fileUrl, index) => (
            <div key={index} className="mb-2">
              {getFilePreview(fileUrl)}
            </div>
          ))}
        <span style={textStyle}>{message.textMessage}</span>
      </div>
    );
  };

  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"
        } mb-2`}
    >
      <div
        className={`max-w-[70%] rounded-lg pr-4 pl-4 pb-4 pt-6 relative group ${sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
          }`}
        style={bubbleStyle}
      >
        <div className="flex text-xs justify-end absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DropDown
            optionsList={messageOptions}
            triggerElement={<FaChevronDown size={15} />}
          />
        </div>
        {renderMessageContent()}
      </div>
    </div>
  );
};

export default MessageBubble;
