import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import DropDown from "../Shared/DropDown";

interface MessageBubbleProps {
  message: string;
  sender: "user" | "other";
  bubbleStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const messageOptions = [
  {
    name: "Reply",
    action: () => console.log("options"),
  },
];

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  sender,
  bubbleStyle,
  textStyle,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(true);
  };
  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-4 pt-5 relative group ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
        style={bubbleStyle}
      >
        {/* <span
          className="flex text-xs justify-end absolute top-0 right-0 mr-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={toggleOptions}
        >
          {showOptions && (
            <DropDown
              optionsList={messageOptions}
              triggerElement={<FaChevronDown />}
            />
          )}
        </span> */}
        {/* <span className="flex text-xs justify-end absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FaChevronDown />
        </span> */}
        {showOptions && (
          <div
            className="lex text-xs justify-end absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={toggleOptions}
          >
            <DropDown
              optionsList={messageOptions}
              triggerElement={<FaChevronDown />}
            />
          </div>
        )}
        <span style={textStyle}>{message}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
