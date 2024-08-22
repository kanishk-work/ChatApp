import React, { useRef, useState, useEffect } from "react";
import {
  FaArrowRight,
  FaPaperclip,
  FaSmile,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import { convertFileToUrl } from "../../Utils/convertFileToUrl";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";

init({ data });

interface MessageComposerProps {
  onSend: (textMessage: string, file: string[] | null) => void;
  replyMessage: {
    textMessage: string;
    file: string[] | null;
  } | null
  activeChatId: number | null;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  sendButtonStyle?: React.CSSProperties;
  messageComposerStyle?: React.CSSProperties;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  onSend,
  replyMessage, 
  buttonText = "Send",
  buttonIcon = <FaArrowRight />,
  sendButtonStyle,
  messageComposerStyle,
  activeChatId
}) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messageComposerRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    setShowEmojiPicker(false);
    if (message.trim() || files.length > 0) {
      let fileUrls: string[] = [];

      if (files.length > 0) {
        fileUrls = await Promise.all(
          files.map((file) => convertFileToUrl(file))
        );
        setFiles([]);
      }
      onSend(message, fileUrls.length > 0 ? fileUrls : null);
      // {
      //   replyMessage
      //     ? onReply(message, fileUrls.length > 0 ? fileUrls : null)
      //     : onSend(message, fileUrls.length > 0 ? fileUrls : null);
      // }
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      messageComposerRef.current &&
      !messageComposerRef.current.contains(event.target as Node)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMessage("");
    setFiles([]);
    setShowEmojiPicker(false);
  }, [activeChatId]);

  return (
    <div
      ref={messageComposerRef}
      className="flex flex-col sm:flex-row items-center p-4 border-t border-gray-200 relative"
      style={messageComposerStyle}
    >
      {replyMessage && (
        <div className="w-full p-2 mb-2 bg-gray-100 rounded-lg">
          <div className={`text-sm text-blue-500`}>
            {replyMessage.textMessage}
          </div>
        </div>
      )}
      <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
        <button
          className="mr-4 text-gray-500 hover:text-gray-700 relative"
          onClick={() => setShowOptions(!showOptions)}
          aria-label="Show Options"
        >
          <FaPlus size={24} />
        </button>
        {showOptions && (
          <>
            <button
              className="mr-4 text-gray-500 hover:text-gray-700 relative"
              aria-label="Emoji Picker"
            >
              <FaSmile
                size={24}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 z-10">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
            </button>
            <button
              className="mr-4 text-gray-500 hover:text-gray-700"
              aria-label="Attach File"
            >
              <label htmlFor="file-input">
                <FaPaperclip size={24} />
              </label>
              <input
                id="file-input"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </button>
          </>
        )}
      </div>
      <div className="flex flex-grow items-center relative w-full sm:w-auto">
        <div className="flex items-center w-full relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          {files.map((file, index) => (
            <div key={index} className="flex items-center mr-2 relative">
              <img
                src={URL.createObjectURL(file)}
                alt="File preview"
                className="max-w-full max-h-16 rounded-lg mr-2"
              />
              <button
                onClick={() => handleRemoveFile(file)}
                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                aria-label="Remove File"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleSend}
        className="mt-2 sm:mt-0 ml-0 sm:ml-4 p-2 rounded-full bg-blue-500 text-white flex items-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={sendButtonStyle}
        type="submit"
      >
        {buttonIcon}
        <span className="ml-2">{buttonText}</span>
      </button>
    </div>
  );
};

export default MessageComposer;
