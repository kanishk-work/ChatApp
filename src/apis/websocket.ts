import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { setNewMessage, setNotifications } from "../Redux/slices/chatsSlice";
import { updateMessagesData } from "../DB/database";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";

const eventEmitter = new EventTarget(); // Custom event emitter

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  let url = import.meta.env.VITE_SOCKET_URL;
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector(
    (state: RootState) => state.chats.activeChatId
  );
  const messages = useAppSelector(
    (state: RootState) => state.chats.conversations
  );
  useEffect(() => {
    if (socket) {
      socket.on("resp", (data) => {
        console.log({data})
        if (data && data.resp && data.resp.chat_room_id) {
          updateMessagesData(data.resp.chat_room_id, data.resp);
          if (data.resp.chat_room_id === activeChatId) {
            console.log('current chat message update')
            dispatch(setNewMessage(data.resp));
            console.log("updated messages: ", messages)
          }
          console.log("RESPONSE", data.resp);

          // Emit an event after updating messages
          // eventEmitter.dispatchEvent(
          //   new CustomEvent("messagesUpdated", {
          //     detail: {
          //       chat_room_id: data.resp.chat_room_id,
          //       message: data.resp,
          //     },
          //   })
          // );
        } else {
          console.error("Invalid response data:", data);
        }
      });
      socket.on("newInviteNotification", (data) => {
        setNotifications(data);
        console.log(data);
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

  return {
    sendMessage,
    joinRoom,
    newInvite,
    listenNewInvite,
    socket,
    getNewMessage,
    joinChatRoom,
    eventEmitter,
  };
};

export default useSocket;
