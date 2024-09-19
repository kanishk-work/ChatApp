import React, { useEffect, useRef, useState } from "react";
import { RootState } from "../../Redux/store";
import { v4 as uuidv4 } from 'uuid'; // To generate a temporary ID
import MessageBubble from "../MessageBubble/MessageBubble";
import MessageComposer from "./MessageComposer";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import StatusBar from "./StatusBar";
import {
  useGetPreviousMessagesMutation,
  useMessageReactMutation,
  useSendMessageMutation,
  useSendReplyMutation,
  useUploadFileMutation,
} from "../../apis/chatApi";
import useSocket from "../../apis/websocket";
import { getChatData, getMessagesByChatIdData, updateLatestMessageData, updateMessagesData, } from "../../DB/database";
import { ChatMessage, ConversationsType } from "../../Types/conversationsType";
import { Chat } from "../../Types/chats";
import {
  setConversations,
  setLatestMessageChat,
  setNewMessage,
  setOlderMessages,
} from "../../Redux/slices/chatsSlice";
import { addDateTags } from "../../Utils/formatDatetag";
import { useToast } from "../Shared/Toast/ToastProvider";
import Loader from "../Shared/Loader";

const ChatWindow: React.FC = () => {
  const [messagesOld, setMessages] = useState<ConversationsType[]>([]);
  const [activeChat, setActiveChat] = useState<Chat>();
  const [replyMessage, setReplyMessage] = useState<ChatMessage | null>(null);
  const [oldMessagesLoading, setOldMessagesLoading] = useState(false);
  const { showToast } = useToast();

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
  const socket_room: string = activeChat
    ? activeChat?.chatSocket[0].socket_room
    : "";
  const typingUser = useAppSelector(
    (state: RootState) => state.chats.typing[socket_room]
  );

  const [sendMessageApi] = useSendMessageMutation();
  const [sendReplyApi] = useSendReplyMutation();
  const [uploadFile] = useUploadFileMutation();
  const [messageReact] = useMessageReactMutation();
  const [getPreviousMessages] = useGetPreviousMessagesMutation();

  const { sendMessage, sendReaction } = useSocket();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        /* behavior: "smooth" */
      });
    }
  }, [messages]);

  const handleSend = async (textMessage: string, files: File[]) => {
    setReplyMessage(null); // Reset reply message after sending

    if (activeChatId !== null) {
      let newMessage;
      let messageReply;
      let socketPayload;
      let fileUrls = [];
      const tempMessageId = Number('0x' + uuidv4().replace(/-/g, ''));
      const tempStatusId = Number('0x' + uuidv4().replace(/-/g, ''));
      const tempFileId = Number('0x' + uuidv4().replace(/-/g, ''));

      if (files && files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });

        try {
          const uploadResponse = await uploadFile(formData).unwrap();
          fileUrls = uploadResponse?.list || [];
        } catch (error) {
          console.error("Failed to upload files:", error);
          return;
        }
      }

      if (replyMessage) {
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
      
      // Optimistic Message before message sent (Waiting status)
      const optimisticMessage = {
        id: tempMessageId, // Temporary ID
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        deletedAt: null,
        chatFiles: fileUrls.length ? fileUrls.map((fileUrl: any) => ({
          id: Number('0x' + uuidv4().replace(/-/g, '')), 
          chat_id: tempMessageId, 
          chat_reply_id: null, 
          user_id: activeUserId, 
          file_url: fileUrl, 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(), 
          deletedAt: null, 
          is_deleted: false 
        })) : [],
        chatReactions: [],
        chatStatus: [{
          id: tempStatusId,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          deletedAt: null,
          user_id: activeUserId,
          chat_id: activeChatId,
          parent_chat_id: null,
          delivered: false,
          read: false,
        }],
        sender_id: activeUserId,
        receiver_id: newMessage?.receiver_id || null,
        message: textMessage,
        chat_room_id: activeChatId,
        is_reply: replyMessage ? true : false,
        parent_chat_id: replyMessage?.id || null,
        is_deleted: false,
      };

      // Dispatch the optimistic message to Redux (waiting status)
      dispatch(setNewMessage({ newMessage: optimisticMessage }));
      await updateMessagesData(activeChatId, optimisticMessage);
      await updateLatestMessageData(activeChatId, optimisticMessage);
      dispatch(setLatestMessageChat(optimisticMessage))

      try {
        const resp = replyMessage
          ? await sendReplyApi(messageReply).unwrap()
          : await sendMessageApi(newMessage).unwrap();
        sendMessage({ ...socketPayload, resp: resp.data });

        await updateMessagesData(resp.data.chat_room_id, resp.data, tempMessageId);
        await updateLatestMessageData(resp.data.chat_room_id, resp.data);
        dispatch(setLatestMessageChat(resp.data))

        if (resp.data.chat_room_id === activeChatId) {
          dispatch(setNewMessage({ newMessage: resp.data, tempMessageId: tempMessageId }));
        }

      } catch (error) {
        console.error("Failed to send message:", error);
        // Optionally handle the failure case (e.g., remove the optimistic message from Redux)
        dispatch(setNewMessage({ tempMessageId: tempMessageId }));
      }
    }
  };


  const handleReact = async (reaction: {
    messageId: number;
    reactionCode: string;
  }) => {
    if (reaction) {
      try {
        const reactResponse = await messageReact({
          chat_id: reaction.messageId,
          reaction_code: reaction.reactionCode,
        });
        sendReaction({
          frq: activeChat?.chatSocket[0].socket_room,
          resp: reactResponse.data.data,
        });
      } catch (error) {
        console.error("Failed to send reaction:", error);
        return;
      }
    }
  };

  useEffect(() => {
    setReplyMessage(null);
  }, [activeChatId]);

  // To get activeChat and its messages from indexedDB
  useEffect(() => {
    const getActiveChat = async () => {
      if (activeChatId !== null) {
        const activeChat = await getChatData(activeChatId);
        if (activeChat) {
          setActiveChat(activeChat);
        }
      }
    };
    const getMessages = async () => {
      if (activeChatId !== null) {
        const messages = await getMessagesByChatIdData(activeChatId);
        if (messages && messages.length > 0) {
          setMessages(messages);
          dispatch(setConversations(messages));
        }
      }
    };
    getActiveChat();
    getMessages();
  }, [activeChatId, dispatch]);

  const fetchOlderMessages = async (
    chatRoomId: number | null,
    lastMessageId: number | null
  ) => {
    setOldMessagesLoading(true);
    try {
      const newMessages = await getPreviousMessages({
        chatRoomId,
        lastMessageId,
      });
      console.log(newMessages.data.list);

      if (newMessages.data.list.length > 0) {
        dispatch(setOlderMessages(newMessages.data.list));
        showToast("Fetched older messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      showToast("Error fetching messages");
    } finally {
      setOldMessagesLoading(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (element.scrollTop === 0 && !oldMessagesLoading) {
      fetchOlderMessages(activeChatId, messages[0]?.messages?.chatsList[0].id);
    }
  };

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
      <div
        className="flex-1 overflow-auto p-4 scrollbar-custom"
        onScroll={handleScroll}
      >
        {oldMessagesLoading && (
          <div className="dynamic-notif flex items-center justify-center gap-3 rounded-lg">
            <span>loading older messages</span> <Loader />{" "}
          </div>
        )}
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
                chatUsers={activeChat?.chatUsers}
                setReplyMessage={setReplyMessage}
                onReact={handleReact}
              />
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {typingUser && <div>{typingUser} is typing...</div>}

      <MessageComposer
        onSend={handleSend}
        replyMessage={replyMessage}
        activeChatId={activeChat?.chatSocket[0]?.socket_room}
        messageComposerStyle={{ backgroundColor: "#CED9E4" }}
        setReplyMessage={setReplyMessage}
      />{" "}
    </div>
  );
};

export default ChatWindow;
