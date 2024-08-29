import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { setNotifications } from "../Redux/slices/chatsSlice";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  let url = import.meta.env.VITE_SOCKET_URL;
  useEffect(() => {
    if (socket) {
      socket.on("resp", (data) =>
        console.log(`RESPONSE ${JSON.stringify(data)}`)
      );
      socket.on("newInviteNotification", (data) => {
        setNotifications(data);
        console.log(data);
      });
      socket.on("isTyping", (data) => {
        console.log(`${data.userName} is typing...`);
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

  const emitTyping = (frq: string, userName: string) => {
    if (socket) {
      socket.emit("isTyping", { frq, userName });
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
