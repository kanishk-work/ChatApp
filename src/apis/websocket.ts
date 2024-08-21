import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { setNotifications } from "../Redux/slices/chatsSlice";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
let url=import.meta.env.VITE_SOCKET_URL
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

  const getNewMessage = (callback: (data: any) => void) => {
    if (socket) {
      socket.on("resp", callback);
    }
  };

  const joinRoom = (roomId: number | string) => {
    if (socket) {
      socket.emit("join", { frq: roomId });
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
  };
};

export default useSocket;