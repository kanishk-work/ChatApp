import React, { useEffect, useRef, useState } from "react";
import { RootState } from "../../Redux/store";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "./MessageComposer";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import StatusBar from "./StatusBar";
import { formatTime } from "../../Utils/formatTimeStamp";
import {
  useGetConversationsMutation,
  useSendMessageMutation,
  useSendReplyMutation,
} from "../../apis/chatApi";
import useSocket from "../../apis/websocket";
// import { setConversations } from "../../Redux/slices/chatsSlice";

const ChatWindow: React.FC = () => {
  const [isReply, setIsReply] = useState(false);
  const [replyMessage, setReplyMessage] = useState<{
    messageId: number;
    textMessage: string;
    sender: "user" | "other";
  } | null>(null); 
  
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const chats = useAppSelector((state: RootState) => state.chats.chats);
  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id
  );
  const chatMessages = useAppSelector(
    (state: RootState) => state.chats.conversations
  );
  const [getConversations] = useGetConversationsMutation();
  const [sendMessageApi] = useSendMessageMutation();
  const [sendReplyApi] = useSendReplyMutation();

  const { getNewMessage, socket, sendMessage } = useSocket();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (activeChatId !== null) {
        try {
          await getConversations(activeChatId).unwrap();
        } catch (error) {
          console.error("Failed to fetch conversations:", error);
        }
      }
    };

    fetchConversations();
  }, [activeChatId, getConversations]);

  useEffect(() => {
    if (socket) {
      socket.on("resp", (data) => console.log({ data }));
    }
  }, [socket]);

  const handleSend = async (textMessage: string, file: string[] | null) => {
    setReplyMessage(null); // Reset reply message after sending
    setIsReply(false); // Reset isReply state after sending
    if (activeChatId !== null) {
      const newMessage = {
        receiver_id: activeChat?.chatUsers.find(
          (user) => user.user.id !== activeUserId
        )?.user_id,
        message: textMessage,
        chat_room_id: activeChatId,
        files_list: file || [],
      };
      try {
        await sendMessageApi(newMessage).unwrap();
        const socketPayload = {
          chat: {
            fromId: activeUserId,
            toId: newMessage.receiver_id,
            msg: textMessage,
            roomId: activeChatId,
            filesList: file,
            frq: activeChat?.chatSocket[0]?.socket_room,
          },
        };
        sendMessage(socketPayload);
        await getConversations(activeChatId);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleReply = async (
    textMessage: string,
    file: string[] | null,
  ) => {
    setReplyMessage(null); // Reset reply message after sending
    setIsReply(false); // Reset isReply state after sending
    if (activeChatId !== null) {
      const messageReply = {
        message: textMessage,
        chat_id: replyMessage?.messageId,
        files_list: file || [],
      };
      try {
        await sendReplyApi(messageReply).unwrap();
        const socketPayload = {
          chat: {
            fromId: activeUserId,
            toId: activeChat?.chatUsers.find(
              (user) => user.user.id !== activeUserId
            )?.user_id,
            msg: textMessage,
            roomId: activeChatId,
            filesList: file,
            frq: activeChat?.chatSocket[0]?.socket_room,
          },
        };
        sendMessage(socketPayload);
        await getConversations(activeChatId);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <StatusBar
        statusBarStyles={{
          container: { backgroundColor: "", borderRadius: "1rem" },
          activityStatus: { color: "#27AE60" },
        }}
      />
      <div className="flex-1 overflow-auto p-4 scrollbar-custom">
        {chatMessages
          .filter((message) => message.chat_room_id === activeChatId)
          .map((message, index) => (
            <div key={index}>
              <MessageBubble
                message={{
                  messageId: message.id,
                  textMessage: message.message,
                  file: message.chatFiles,
                }}
                sender={message.sender_id === activeUserId ? "user" : "other"}
                setIsReply= {setIsReply}
                setReplyMessage={setReplyMessage} // Pass it here
              />
              <div className="text-center text-xs text-gray-500 my-2">
                {formatTime(message.createdAt)}
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4">
        <MessageComposer
          onSend={handleSend}
          isReply = {isReply}
          onReply={handleReply}
          replyMessage={replyMessage} // Pass the reply message to the composer
          messageComposerStyle={{ backgroundColor: "#CED9E4" }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
