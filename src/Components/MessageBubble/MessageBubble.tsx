import React, { useState } from "react";
import { FaChevronDown, FaDownload, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint } from 'react-icons/fa';
import DropDown from "../Shared/DropDown";
import { ChatMessage } from "../../Types/conversationsType";
import { formatTime } from "../../Utils/formatTimeStamp";
import { BiCheck, BiCheckDouble, BiTime } from "react-icons/bi";

interface MessageBubbleProps {
  message: ChatMessage;
  parentMessage: ChatMessage | undefined;
  sender: "user" | "other";
  senderName: string | undefined;
  setReplyMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>;
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
    const isImage = (url: string) => url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
    const isVideo = (url: string) => url.match(/\.(mp4|webm|ogg)$/i) !== null;
    const isAudio = (url: string) => url.match(/\.(mp3|wav|ogg)$/i) !== null;
    const isDocument = (url: string) => url.match(/\.(pdf|doc|docx|ppt|pptx|xls|xlsx|csv)$/i) !== null;

    return (
      <div className="flex items-center space-x-2">
        <div>
          {isImage(fileUrl) ? (
            <img
              src={fileUrl}
              className="block h-40 object-contain"
              alt="Image Preview"
            />
          ) : isVideo(fileUrl) ? (
            <video controls className="block h-64">
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : isAudio(fileUrl) ? (
            <audio controls className="block h-16">
              <source src={fileUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          ) : isDocument(fileUrl) ? (
            // Render document preview as an icon or thumbnail
            <div className="w-16 h-16 flex items-center justify-center border rounded-lg dynamic-text-color-primary text-2xl">
              {fileUrl.endsWith('.pdf') ? (
                <FaFilePdf className="text-red-600" />
              ) : fileUrl.endsWith('.doc') || fileUrl.endsWith('.docx') ? (
                <FaFileWord className="text-blue-600" />
              ) : fileUrl.endsWith('.xls') || fileUrl.endsWith('.xlsx') || fileUrl.endsWith('.csv') ? (
                <FaFileExcel className="text-green-600" />
              ) : fileUrl.endsWith('.ppt') || fileUrl.endsWith('.pptx') ? (
                <FaFilePowerpoint className="text-red-600" />
              ) : (
                <span>File</span>
              )}
            </div>
          ) : (
            <span className="block text-sm text-gray-700">{fileUrl}</span>
          )}
          <button
            onClick={() => handleDownload(fileUrl)}
            className="hover:underline mt-1 flex items-center dynamic-text-color-primary"
          >
            <FaDownload className="" />
          </button>
        </div>
      </div>
    );
  };


  const renderMessageContent = () => {
    return (
      <div className="flex flex-col gap-3">
        {parentMessage && (
          <div
            className="w-full text-center dynamic-accent-color py-2 px-4 rounded-lg"
            style={textStyle}
          >
            {parentMessage.chatFiles &&
              parentMessage.chatFiles.map((chatFile, index) => (
                <div key={index} className="">
                  {getFilePreview(chatFile.file_url)}
                </div>
              ))}
            <span>{parentMessage.message}</span>
          </div>
        )}
        {message.chatFiles &&
          message.chatFiles.map((chatFile, index) => (
            <div key={index} className="">
              {getFilePreview(chatFile.file_url)}
            </div>
          ))}
        <span style={textStyle}>{message.message}</span>
        <span className="text-sm">{formatTime(message.createdAt)}</span>
        <div className="flex justify-between">
          <span className="text-sm">{message.chatStatus[0].read ? <BiCheckDouble /> : message.chatStatus[0].delivered ? <BiCheck /> : <BiTime />}</span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col ${sender === "user" ? "items-end" : "items-start"
        } mb-2`}
    >
      {sender === "other" && (
        <span className="dynamic-text-color-secondary">{senderName}</span>
      )}

      <div
        className={`max-w-[70%] rounded-lg px-5 py-1 relative group ${sender === "user"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-black"
          }`}
        style={bubbleStyle}
      >
        <div
          className={`flex text-xs justify-end absolute top-0 ${sender === "user" ? "left-0" : "right-0"
            } cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
        >
          <DropDown
            optionsList={messageOptions}
            triggerElement={<FaChevronDown />}
            btnClassName={`flex items-center dynamic-accent-color p-1 dynamic-text-color-primary ${sender === "user" ? "rounded-br-lg" : "rounded-bl-lg"
              }`}
            dropBoxClassName={`${sender === "user" ? "right-0" : "left-0"}`}
          />
        </div>
        {renderMessageContent()}
      </div>
    </div>
  );
};

export default MessageBubble;
