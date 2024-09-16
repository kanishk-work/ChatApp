import React, { useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaDownload,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
} from "react-icons/fa";
import DropDown from "../Shared/DropDown";
import { ChatMessage } from "../../Types/conversationsType";
import { formatTime } from "../../Utils/formatTimeStamp";
import { BiCheck, BiCheckDouble, BiTime } from "react-icons/bi";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";
import { ChatUser } from "../../Types/chats";

init({ data });

interface ReactionData {
  messageId: number;
  reactionCode: string;
}

interface MessageBubbleProps {
  message: ChatMessage;
  parentMessage: ChatMessage | undefined;
  sender: "user" | "other";
  senderName: string | undefined;
  setReplyMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>;
  onReact: (reaction: {
    messageId: number;
    reactionCode: string;
  }) => Promise<void>;
  chatUsers: ChatUser[] | undefined;
  bubbleStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  parentMessage,
  sender,
  senderName,
  setReplyMessage,
  onReact,
  chatUsers,
  bubbleStyle,
  textStyle,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [openReaction, setOpenReaction] = useState<string | null>(null);
  const [pickerPosition, setPickerPosition] = useState<'top' | 'bottom'>('bottom'); // 'top' or 'bottom'

  const containerRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const messageOptions = [
    {
      name: "Reply",
      action: () => {
        setReplyMessage(message);
      },
    },
    {
      name: "Download",
      action: () => console.log("Download option selected"),
    },
    {
      name: "React",
      action: () => setShowEmojiPicker(!showEmojiPicker),
    },
  ];

  const handleReaction = (emoji: any) => {
    console.log(emoji.native);
    onReact({ messageId: message.id, reactionCode: emoji.native });
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
    const isImage = (url: string) =>
      url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
    const isVideo = (url: string) => url.match(/\.(mp4|webm|ogg)$/i) !== null;
    const isAudio = (url: string) => url.match(/\.(mp3|wav|ogg)$/i) !== null;
    const isDocument = (url: string) =>
      url.match(/\.(pdf|doc|docx|ppt|pptx|xls|xlsx|csv)$/i) !== null;

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
              {fileUrl.endsWith(".pdf") ? (
                <FaFilePdf className="text-red-600" />
              ) : fileUrl.endsWith(".doc") || fileUrl.endsWith(".docx") ? (
                <FaFileWord className="text-blue-600" />
              ) : fileUrl.endsWith(".xls") ||
                fileUrl.endsWith(".xlsx") ||
                fileUrl.endsWith(".csv") ? (
                <FaFileExcel className="text-green-600" />
              ) : fileUrl.endsWith(".ppt") || fileUrl.endsWith(".pptx") ? (
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
    const allRead = message.chatStatus.every((status) => status.read);
    const anyDelivered = message.chatStatus.some((status) => status.delivered);

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
        <div className="flex justify-between">
          <span className="text-sm">
            {sender === "user" ? (
              allRead ? (
                <BiCheckDouble />
              ) : anyDelivered ? (
                <BiCheck />
              ) : (
                <BiTime />
              )
            ) : null}
          </span>{" "}
          <span className="text-sm">{formatTime(message.createdAt)}</span>
        </div>
      </div>
    );
  };

  const groupReactions = () => {
    return message.chatReactions.reduce((acc, reaction) => {
      const user = chatUsers?.find((user) => user.user.id === reaction.user_id);

      if (!acc[reaction.reaction_code]) {
        acc[reaction.reaction_code] = [];
      }

      if (user) {
        acc[reaction.reaction_code].push(user.user.full_name);
      }

      return acc;
    }, {} as Record<string, string[]>);
  };

   useEffect(() => {
    if (showEmojiPicker && containerRef.current && pickerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const pickerHeight = pickerRef.current.offsetHeight;

      const spaceAbove = containerRect.top;
      const spaceBelow = window.innerHeight - containerRect.bottom;
      
      console.log('spaceAbove:', spaceAbove);
      console.log('spaceBelow:', spaceBelow);
      console.log('pickerheight:', pickerHeight);

      console.log('pickerPosition:', pickerPosition);

      // Check if there's more space above or below the container, and position accordingly
      if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
        setPickerPosition('top');
      } else {
        setPickerPosition('bottom');
      }
    }
  }, [showEmojiPicker]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    // Use setTimeout to ensure that the emoji picker gets a chance to open before the event listener closes it.
    const timeoutId = setTimeout(() => {
      window.addEventListener('click', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const groupedReactions = groupReactions();
  const handleToggleReaction = (reactionCode: string) => {
    setOpenReaction(openReaction === reactionCode ? null : reactionCode);
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
          ref={containerRef}
          className={`flex text-xs justify-end absolute top-0 ${sender === "user" ? "left-0" : "right-0"
            } cursor-pointer opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200`}
        >
          <DropDown
            optionsList={messageOptions}
            triggerElement={<FaChevronDown />}
            btnClassName={`flex items-center dynamic-accent-color p-1 dynamic-text-color-primary ${sender === "user" ? "rounded-br-lg" : "rounded-bl-lg"
              }`}
            dropBoxClassName={`${sender === "user" ? "right-0" : "left-0"}`}
          />
          {showEmojiPicker && (
            <div
              ref={pickerRef}
              className={`absolute ${sender === 'user' ? 'right-0' : 'left-0'} ${pickerPosition === 'top' ? 'bottom-12' : 'top-12'} z-10`}
            >
              <Picker style={{ height: '300px' }} data={data} onEmojiSelect={handleReaction} maxFrequentRows={0} previewPosition={'none'} />
            </div>
          )}
        </div>
        {renderMessageContent()}
        <div className="flex gap-2 flex-wrap mt-2">
          {Object.entries(groupedReactions).map(([reactionCode, userNames]) => (
            <div key={reactionCode} className="relative">
              <button
                className="flex items-center bg-gray-300 rounded-full px-2 py-1"
                onClick={() => handleToggleReaction(reactionCode)}
              >
                {reactionCode} <span className="ml-1">{userNames.length}</span>
              </button>

              {openReaction === reactionCode && (
                <div className="absolute top-10 left-0 dynamic-accent-color dynamic-text-color-secondary shadow-lg p-2 rounded">
                  <span className="text-sm">Reacted by:</span>
                  {userNames.map((userName, idx) => (
                    <span key={idx} className="block text-xs">
                      {userName}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
