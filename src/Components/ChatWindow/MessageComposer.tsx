import React, { useRef, useState, useEffect } from "react";
import {
  FaArrowRight,
  FaPaperclip,
  FaSmile,
  FaTimes,
  FaPlus,
  FaMicrophone,
  FaTrash,
  FaStop,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";
import { ChatMessage } from "../../Types/conversationsType";
import useSocket from "../../apis/websocket";
import { useAppSelector } from "../../Redux/hooks";
import useAudioRecorder from "../../Utils/CustomHooks/useAudioRecorder2";
import { GiCancel } from "react-icons/gi";
// import { useAudioRecorder } from "../../Utils/CustomHooks/useAudioRecorder";

init({ data });

interface MessageComposerProps {
  onSend: (textMessage: string, file: File[]) => void;
  replyMessage: ChatMessage | null;
  activeChatId: string | undefined;
  setReplyMessage: React.Dispatch<React.SetStateAction<ChatMessage | null>>;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  sendButtonStyle?: React.CSSProperties;
  messageComposerStyle?: React.CSSProperties;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  onSend,
  replyMessage,
  setReplyMessage,
  buttonIcon = <FaArrowRight />,
  sendButtonStyle,
  messageComposerStyle,
  activeChatId,
}) => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messageComposerRef = useRef<HTMLDivElement>(null);
  const { emitTyping } = useSocket();
  const activeUser = useAppSelector((state) => state.activeUser);

  const {
    isRecording,
    isPaused,
    hasPermission,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteRecording,
    getAudioFile,
    audioUrl,
    elapsedTime,
    formatTime,
  } = useAudioRecorder();

  // useEffect(() => {
  //   requestMicAccess();
  // }, []);
  const handleSend = async () => {
    setShowEmojiPicker(false);
    const audioFile = await getAudioFile();
    let filesToSend = [...files];
    if (audioFile) {
      filesToSend.push(audioFile);
    }
    if (message.trim() || filesToSend.length > 0) {
      onSend(message, filesToSend);
      setFiles([]);
      setMessage("");
      deleteRecording();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (activeChatId) {
      emitTyping(activeChatId, activeUser.full_name, activeUser.id);
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
        <div className="flex items-center gap-2 justify-center w-full relative">
          <div className="flex-grow flex flex-col gap-2">
            {replyMessage && (
              <div className={`w-full p-2 bg-gray-100 rounded-xl text-lg text-blue-500 flex justify-between items-center`}>
                <span>{replyMessage.message}</span>
                <button className="p-1"><GiCancel onClick={() => setReplyMessage(null)} /></button>
              </div>
            )}
            <input
              type="text"
              value={message}
              onChange={handleTyping}
              className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
          </div>
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
          <button
            onClick={
              !isRecording
                ? startRecording
                : !isPaused
                  ? pauseRecording
                  : resumeRecording
            }
            className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            aria-label="Record"
          >
            {!isRecording ? (
              <FaMicrophone size={20} />
            ) : !isPaused ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>

          {isRecording && (
            <>
              <button
                onClick={stopRecording}
                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                aria-label="Record"
              >
                <FaStop size={20} />
              </button>
              <span>{formatTime(elapsedTime)}</span>
            </>
          )}

          {audioUrl && (
            <div className="flex items-center gap-2">
              <button
                onClick={deleteRecording}
                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                aria-label="Delete Recording"
              >
                <FaTrash />
              </button>
              <audio controls src={audioUrl} />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleSend}
        style={sendButtonStyle}
        className="ml-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
        aria-label="Send Message"
      >
        {buttonIcon}
      </button>
    </div>
  );
};

export default MessageComposer;
