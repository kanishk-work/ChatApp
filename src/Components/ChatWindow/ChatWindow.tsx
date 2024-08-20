import React, { useEffect, useRef } from "react";
import { RootState } from "../../Redux/store";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "./MessageComposer";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import StatusBar from "./StatusBar";
import { formatTime } from "../../Utils/formatTimeStamp";
import {
  useGetConversationsMutation,
  useSendMessageMutation,
} from "../../apis/chatApi";
import useSocket from "../../apis/websocket";
// import { setConversations } from "../../Redux/slices/chatsSlice";

const ChatWindow: React.FC = () => {
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
  const { getNewMessage, socket, sendMessage } = useSocket(
    import.meta.env.VITE_HOST_URL
  );

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
                  textMessage: message.message,
                  file: message.chatFiles,
                }}
                sender={message.sender_id === activeUserId ? "user" : "other"}
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
          messageComposerStyle={{ backgroundColor: "#CED9E4" }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
