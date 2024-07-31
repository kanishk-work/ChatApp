import React from "react";

interface MessageBubbleProps {
  message: string;
  sender: "user" | "other";
  bubbleStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  sender,
  bubbleStyle,
  textStyle,
}) => {
  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-2 ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
        style={bubbleStyle}
      >
        <span style={textStyle}>{message}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
