import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { setLatestMessageChat, setNewMessage, setNotifications, setTypingStatus, setUnreadCountChat } from "../Redux/slices/chatsSlice";
import { updateLatestMessageData, updateMessagesData, updateUnreadMessageCountData } from "../DB/database";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  let url = import.meta.env.VITE_SOCKET_URL;
  const dispatch = useAppDispatch();
  
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const activeChatIdRef = useRef<number | null>(activeChatId);
  useEffect(() => {
    activeChatIdRef.current = activeChatId;
  }, [activeChatId]);
  
  let typingTimeouts: { [frq: string]: NodeJS.Timeout } = {};
  const activeUser = useAppSelector((state) => state.activeUser);

  useEffect(() => {
    if (socket) {
      socket.on("resp", (data) => {
        console.log({ data })
        const currentActiveChatId = activeChatIdRef.current;

        if (data && data.resp && data.resp.chat_room_id) {
          updateMessagesData(data.resp.chat_room_id, data.resp);
          updateLatestMessageData(data.resp.chat_room_id, data.resp);
          console.log({ currentActiveChatId })
          dispatch(setLatestMessageChat(data.resp))

          if (data.resp.chat_room_id === currentActiveChatId) {
            console.log('current chat message update')
            dispatch(setNewMessage(data.resp));
          } else if (data.resp.chat_room_id) {
            updateUnreadMessageCountData(data.resp.chat_room_id, 'increment');
            dispatch(setUnreadCountChat({ chatRoomId: data.resp.chat_room_id, actionType: 'increment' }));
            console.log({ currentActiveChatId })
          }
          console.log("RESPONSE", data.resp);
        } else {
          console.error("Invalid response data:", data);
        }
      });
      socket.on("newInviteNotification", (data) => {
        dispatch(setNotifications(data));
        console.log(data);
      });
      socket.on("isTyping", (data: { frq: string, userName: string | null, userId: number }) => {
        console.log(`${data.userName} is typing in ${data.frq}`);
        if (data.userId === activeUser.id) return;
        dispatch(setTypingStatus(data));

        if (typingTimeouts[data.frq]) {
          clearTimeout(typingTimeouts[data.frq]);
        }

        typingTimeouts[data.frq] = setTimeout(() => {
          dispatch(setTypingStatus({ frq: data.frq, userName: null }));
          delete typingTimeouts[data.frq];
        }, 1000);
      });

      socket.on("reactResp", (data) => {
        console.log({ data })
        const currentActiveChatId = activeChatIdRef.current;
        
      });
    }
  }, [socket]);
  useEffect(() => {
    const socketInstance = io(url, {
      // withCredentials: true,
    });
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
      console.log(`joined room: ${roomId}`);
    }
  };

  const joinChatRoom = (roomId: string) => {
    if (socket) {
      socket.emit("join", { frq: roomId });
      console.log(`joined room: ${roomId}`);

      // socket.on("resp", (data) => {
      //   console.log(`Chat Resp data ${JSON.stringify(data)}`);
      // });
    }
  };

  const newInvite = ({
    roomId,
    socketRoom,
  }: {
    roomId: string;
    socketRoom: string;
  }) => {
    if (socket) {
      console.log("new invite data:", { roomId, socketRoom });
      socket.emit("newInvite", { frq: roomId, chatFrq: socketRoom });
    }
  };

  const sendReaction = (reactionData: {frq: string, resp: any}) => {
    if (socket) {
      socket.emit("react", reactionData);
    }
  };

  // listeing
  const getNewMessage = () => {
    if (socket) {
      socket.on("resp", (data) => {
        console.log(`Chat Resp data ${JSON.stringify(data)}`);
      });
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
    getNewMessage,
    joinChatRoom,
    emitTyping,
  };
};

export default useSocket;
