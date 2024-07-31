import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface MessageComposerProps {
  onSend: (message: string) => void;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  sendButtonStyle?: React.CSSProperties;
  messageComposerStyle?: React.CSSProperties;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  onSend,
  buttonText = "Send",
  buttonIcon = <FaArrowRight />,
  sendButtonStyle,
  messageComposerStyle,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-2 rounded-l-lg border border-gray-300"
        style={messageComposerStyle}
      />
      <button
        onClick={handleSend}
        className="p-2 rounded-r-lg bg-blue-500 text-white flex items-center"
        style={sendButtonStyle}
      >
        {buttonIcon}
        <span className="ml-2">{buttonText}</span>
      </button>
    </div>
  );
};

export default MessageComposer;
