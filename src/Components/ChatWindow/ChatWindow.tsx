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
import { ChatMessage } from "../../Types/chats";
// import { setConversations } from "../../Redux/slices/chatsSlice";

const ChatWindow: React.FC = () => {
  const [replyMessage, setReplyMessage] = useState<ChatMessage | null>(null);

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
    if (activeChatId !== null) {
      let newMessage;
      let messageReply;
      let socketPayload;

      // sending reply
      if (replyMessage) {
        console.log(
          `this is a reply: ${textMessage} to-messageid: ${replyMessage?.id}`
        );
        messageReply = {
          message: textMessage,
          chat_id: replyMessage?.id,
          files_list: file || [],
        };

        socketPayload = {
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
        //sending normal message
      } else {
        console.log(`this is a normal message: ${textMessage}`);
        newMessage = {
          receiver_id: activeChat?.chatUsers.find(
            (user) => user.user.id !== activeUserId
          )?.user_id,
          message: textMessage,
          chat_room_id: activeChatId,
          files_list: file || [],
        };

        socketPayload = {
          chat: {
            fromId: activeUserId,
            toId: newMessage?.receiver_id,
            msg: textMessage,
            roomId: activeChatId,
            filesList: file,
            frq: activeChat?.chatSocket[0]?.socket_room,
          },
        };
      }

      try {
        {
          replyMessage
            ? await sendReplyApi(messageReply).unwrap()
            : await sendMessageApi(newMessage).unwrap();
          sendMessage(socketPayload);
          await getConversations(activeChatId);
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  useEffect(() => {
    setReplyMessage(null);
  }, [activeChatId]);

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
          .map((message, index) => {
            // Find parent message if it exists
            const parentMessage = chatMessages.find(
              (m) => m.id === message.parent_chat_id
            );
            return (
              <div key={index}>
                <MessageBubble
                  message={message}
                  parentMessage={parentMessage} 
                  sender={message.sender_id === activeUserId ? "user" : "other"}
                  senderName={activeChat?.chatUsers.find((user) => user.user.id === message.sender_id)?.user.full_name}
                  setReplyMessage={setReplyMessage} 
                />
                <div className="text-center text-xs text-gray-500 my-2">
                  {formatTime(message.createdAt)}
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4">
        <MessageComposer
          onSend={handleSend}
          replyMessage={replyMessage}
          activeChatId={activeChatId}
          messageComposerStyle={{ backgroundColor: "#CED9E4" }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
