import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log({ url });
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
      console.log({ message });
      socket.emit("send", message);
    }
  };

  const joinRoom = (roomId: number | string) => {
    if (socket) {
      console.log({ roomId });
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
  return { sendMessage, joinRoom, newInvite, socket };
};

export default useSocket;
