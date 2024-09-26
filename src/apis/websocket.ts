import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  setLatestMessageChat,
  setLatestMessageReadStatus,
  setNewChat,
  setNewMessage,
  setNotifications,
  setReadStatusDataChat,
  setTypingStatus,
  setUnreadMessagesDataChat,
  setUpdatedReactions,
} from "../Redux/slices/chatsSlice";
import {
  addReactionToMessageData,
  storeChatData,
  updateLatestMessageData,
  updateLatestMessageReadStatusData,
  updateMessagesData,
  updateReadStatusData,
  updateUnreadMessagesData,
} from "../DB/database";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import { useMessageReadUpdateMutation } from "./chatApi";
import { UnreadMsgs } from "../Types/chats";
import { ChatMessage } from "../Types/conversationsType";
import { shallowEqual } from "react-redux";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  let url = import.meta.env.VITE_SOCKET_URL;
  const dispatch = useAppDispatch();

  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId,
    shallowEqual
  );
  const activeChatIdRef = useRef<number | null>(activeChatId);
  useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);

  let typingTimeouts: { [frq: string]: NodeJS.Timeout } = {};
  const activeUser = useAppSelector((state) => state.activeUser);
  const [messageReadUpdate] = useMessageReadUpdateMutation();

  useEffect(() => {
    if (socket) {
      socket.on(
        "resp",
        async (data: { chat: { frq: string }; resp: ChatMessage }) => {
          const { chat, resp } = data;
          const currentActiveChatId = activeChatIdRef.current;

          if (
            data &&
            resp &&
            resp.chat_room_id &&
            resp.id &&
            resp.sender_id !== activeUser.id
          ) {
            await updateMessagesData(resp.chat_room_id, resp);
            await updateLatestMessageData(resp.chat_room_id, resp);
            dispatch(setLatestMessageChat(resp));

            if (resp.chat_room_id === currentActiveChatId) {
              dispatch(setNewMessage({ newMessage: resp }));
              await messageReadUpdate({
                chat_room_id: resp.chat_room_id,
                chat_id_list: [{ chat_id: resp.id }],
              });
              socket.emit("chatStatus", {
                frq: chat.frq,
                chatRoomId: resp.chat_room_id,
                userId: activeUser.id,
                chatIdList: [{ chat_id: resp.id }],
              });
            } else if (resp.chat_room_id) {
              await updateUnreadMessagesData({
                chatRoomId: resp.chat_room_id,
                actionType: "increment",
                newMessageId: resp.id,
              });
              dispatch(
                setUnreadMessagesDataChat({
                  chatRoomId: resp.chat_room_id,
                  actionType: "increment",
                  newMessageId: resp.id,
                })
              );
            }
          } else {
            console.error("Invalid response data:", data);
          }
        }
      );
      socket.on("newInviteNotification", async (data) => {
        dispatch(setNotifications(data));
        if (data && data.resp) {
          await storeChatData([data.resp]);
          dispatch(setNewChat(data.resp));
        }
      });
      socket.on(
        "isTyping",
        (data: { frq: string; userName: string | null; userId: number }) => {
          if (data.userId === activeUser.id) return;
          dispatch(setTypingStatus(data));

          if (typingTimeouts[data.frq]) {
            clearTimeout(typingTimeouts[data.frq]);
          }

          typingTimeouts[data.frq] = setTimeout(() => {
            dispatch(setTypingStatus({ frq: data.frq, userName: null }));
            delete typingTimeouts[data.frq];
          }, 1000);
        }
      );

      socket.on("reactResp", async (data) => {
        const currentActiveChatId = activeChatIdRef.current;

        if (data && data.chat_room_id && data.id && data.chatReactions) {
          await addReactionToMessageData(
            data.chat_room_id,
            data.id,
            data.chatReactions
          );
          if (data.chat_room_id === currentActiveChatId) {
            dispatch(
              setUpdatedReactions({
                messageId: data.id,
                updatedReactions: data.chatReactions,
              })
            );
          }
        } else {
          console.error("Invalid response data:", data);
        }
      });

      socket.on(
        "chatStatusResp",
        async (data: {
          frq: string | undefined;
          chatRoomId: number;
          userId: number;
          chatIdList: UnreadMsgs;
        }) => {
          const currentActiveChatId = activeChatIdRef.current;

          if (
            data?.chatRoomId &&
            data?.frq &&
            data?.chatIdList &&
            data?.userId
          ) {
            try {
              await updateReadStatusData(data);
              await updateLatestMessageReadStatusData(data);
              dispatch(setLatestMessageReadStatus(data));
              if (data.chatRoomId === currentActiveChatId) {
                dispatch(setReadStatusDataChat(data));
              }
            } catch (error) {
              console.error(
                "Failed to update message read status on server:",
                error
              );
            }
          } else {
            console.error("Invalid response data:", data);
          }
        }
      );
    }
  }, [socket]);
  useEffect(() => {
    const socketInstance = io(url);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (socket) {
      socket.emit("send", message);
    }
  };

  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.emit("join", { frq: roomId });
    }
  };

  const joinChatRoom = (roomId: string) => {
    if (socket) {
      socket.emit("join", { frq: roomId });
    }
  };

  const newInvite = (inviteData: {
    frq: string;
    chatFrq: string;
    resp: any;
  }) => {
    if (socket) {
      socket.emit("newInvite", inviteData);
    }
  };

  const sendReaction = (reactionData: {
    frq: string | undefined;
    resp: any;
  }) => {
    if (socket) {
      socket.emit("react", reactionData);
    }
  };

  const messagesRead = (readStatusData: {
    frq: string | undefined;
    chatRoomId: number;
    userId: number;
    chatIdList: UnreadMsgs;
  }) => {
    if (socket) {
      socket.emit("chatStatus", readStatusData);
    }
  };

  const listenNewInvite = () => {
    if (socket) {
      socket.on("newInviteNotification", (data) => {
        setNotifications(data);
      });
    }
  };

  const emitTyping = (frq: string, userName: string, userId: number) => {
    if (socket) {
      socket.emit("isTyping", { frq, userName, userId });
    }
  };

  return {
    sendMessage,
    joinRoom,
    newInvite,
    listenNewInvite,
    socket,
    joinChatRoom,
    emitTyping,
    sendReaction,
    messagesRead,
  };
};

export default useSocket;
