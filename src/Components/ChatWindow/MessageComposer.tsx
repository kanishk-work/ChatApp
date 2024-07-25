import React from "react";

const MessageComposer: React.FC = () => {
  return (
    <div className="p-2 border-t border-gray-200">
      <input
        type="text"
        placeholder="Type a message"
        className="w-full p-2 rounded-lg border border-gray-300"
      />
    </div>
  );
};

export default MessageComposer;
