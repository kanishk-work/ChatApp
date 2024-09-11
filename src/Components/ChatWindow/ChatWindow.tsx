import React, { useEffect, useRef, useState } from "react";
import { RootState } from "../../Redux/store";
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "./MessageComposer";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import StatusBar from "./StatusBar";
import {
  useMessageReactMutation,
  useSendMessageMutation,
  useSendReplyMutation,
  useUploadFileMutation,
} from "../../apis/chatApi";
import useSocket from "../../apis/websocket";
import { getChatData, getMessagesByChatIdData } from "../../DB/database";
import { ChatMessage, ConversationsType } from "../../Types/conversationsType";
import { Chat } from "../../Types/chats";
import { setConversations } from "../../Redux/slices/chatsSlice";
import { addDateTags } from "../../Utils/formatDatetag";

const ChatWindow: React.FC = () => {
  const [messagesOld, setMessages] = useState<ConversationsType[]>([]);
  const [activeChat, setActiveChat] = useState<Chat>();
  const [replyMessage, setReplyMessage] = useState<ChatMessage | null>(null);
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const activeUserId = useAppSelector(
    (state: RootState) => state.activeUser.id
  );
  const messages = useAppSelector(
    (state: RootState) => state.chats.conversations
  );
  const socket_room: string = activeChat ? activeChat?.chatSocket[0].socket_room : ''
  console.log({socket_room});
  const typingUser = 
   useAppSelector(
    (state: RootState) =>
      state.chats.typing[socket_room]
  )

  const [sendMessageApi] = useSendMessageMutation();
  const [sendReplyApi] = useSendReplyMutation();
  const [uploadFile] = useUploadFileMutation();
  const [messageReact] = useMessageReactMutation();

  const { sendMessage, sendReaction } = useSocket();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ /* behavior: "smooth" */});
    }
  }, [messages]);

  const handleSend = async (textMessage: string, files: File[]) => {
    setReplyMessage(null); // Reset reply message after sending
    if (activeChatId !== null) {
      let newMessage;
      let messageReply;
      let socketPayload;
      let fileUrls = [];

      if (files && files.length > 0) {
        const formData = new FormData();
        console.log("files being uploaded:", files);
        files.forEach((file) => {
          formData.append("files", file);
        });

        try {
          const uploadResponse = await uploadFile(formData).unwrap();
          fileUrls = uploadResponse?.list || [];
          console.log("file URLs: ", fileUrls);
        } catch (error) {
          console.error("Failed to upload files:", error);
          return;
        }
      }

      if (replyMessage) {
        console.log(
          `this is a reply: ${textMessage} to-messageid: ${replyMessage?.id}`
        );
        messageReply = {
          message: textMessage,
          chat_id: replyMessage?.id,
          files_list: fileUrls,
        };

        socketPayload = {
          chat: {
            fromId: activeUserId,
            toId: activeChat?.chatUsers.find(
              (user) => user.user.id !== activeUserId
            )?.user_id,
            msg: textMessage,
            roomId: activeChatId,
            filesList: fileUrls,
            frq: activeChat?.chatSocket[0]?.socket_room,
          },
        };
      } else {
        console.log(`this is a normal message: ${textMessage}`);
        newMessage = {
          receiver_id: activeChat?.chatUsers.find(
            (user) => user.user.id !== activeUserId
          )?.user_id,
          message: textMessage,
          chat_room_id: activeChatId,
          files_list: fileUrls,
        };

        socketPayload = {
          chat: {
            fromId: activeUserId,
            toId: newMessage?.receiver_id,
            msg: textMessage,
            roomId: activeChatId,
            filesList: fileUrls,
            frq: activeChat?.chatSocket[0]?.socket_room,
          },
        };
      }

      try {
        const resp = replyMessage
          ? await sendReplyApi(messageReply).unwrap()
          : await sendMessageApi(newMessage).unwrap();
        // console.log(socketPayload);
        sendMessage({ ...socketPayload, resp: resp.data });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleReact = async (reaction: {messageId: number, reactionCode: string}) => {
    if (reaction) {
      try {
        const reactResponse = await messageReact({chat_id: reaction.messageId, reaction_code: reaction.reactionCode});
        console.log('reaction response: ', reactResponse)
        sendReaction({frq: activeChat?.chatSocket[0].socket_room, resp: reactResponse.data.data});
      } catch (error) {
        console.error("Failed to send reaction:", error);
        return;
      }
    }
  }

  useEffect(() => {
    setReplyMessage(null);
  }, [activeChatId]);

  //To get activeChat and its messages from indexedDB
  useEffect(() => {
    const getActiveChat = async () => {
      if (activeChatId !== null) {
        const activeChat = await getChatData(activeChatId);
        if (activeChat) {
          setActiveChat(activeChat);
          console.log("active chat from indexedDB: ", activeChat);
        } else {
          console.log("No chat data found for this id.");
        }
      }
    };
    const getMessages = async () => {
      if (activeChatId !== null) {
        const messages = await getMessagesByChatIdData(activeChatId);
        console.log(`Messages for Chat Room ID: ${activeChatId}`);

        if (messages && messages.length > 0) {
          setMessages(messages);
          dispatch(setConversations(messages));
          console.log(messages);
          console.log("Messages indexedDB:", messages[0].messages);
        } else {
          console.log("No messages found for this chat.");
        }
      }
    };
    getActiveChat();
    getMessages();
  }, [activeChatId]);

  const allMessages = messages[0]?.messages?.chatsList || [];
  const taggedMessages = allMessages && addDateTags(allMessages);
  return (
    <div className="flex flex-col h-full">
      <StatusBar
        activeChat={activeChat}
        statusBarStyles={{
          container: { backgroundColor: "", borderRadius: "1rem" },
          activityStatus: { color: "#27AE60" },
        }}
      />
      <div className="flex-1 overflow-auto p-4 scrollbar-custom">
        {taggedMessages?.map((item, index) => {
          if (item.type === "date") {
            return (
              <div
                key={index}
                className="text-center text-sm dynamic-text-color-secondary my-2"
              >
                <span>{item.tag}</span>
              </div>
            );
          }

          const message = item.message as ChatMessage;
          const parentMessage = allMessages.find(
            (m) => m.id === item.message?.parent_chat_id
          );

          return (
            <div key={message.id}>
              <MessageBubble
                message={message}
                parentMessage={parentMessage}
                sender={message.sender_id === activeUserId ? "user" : "other"}
                senderName={
                  activeChat?.is_group
                    ? activeChat.chatUsers.find(
                      (user) => user.user.id === message.sender_id
                    )?.user.full_name
                    : undefined
                }
                setReplyMessage={setReplyMessage}
                onReact={handleReact}
              />
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <span>
        {typingUser && (
          <div className="dynamic-text-color-secondary">{typingUser} is typing...</div>
        )}
      </span>
      <div className="p-4">
        <MessageComposer
          onSend={handleSend}
          replyMessage={replyMessage}
          activeChatId={activeChat?.chatSocket[0]?.socket_room}
          messageComposerStyle={{ backgroundColor: "#CED9E4" }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
