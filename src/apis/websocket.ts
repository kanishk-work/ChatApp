import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { setNotifications } from "../Redux/slices/chatsSlice";

const useSocket = (url: string) => {

  /* useEffect(() => {
     socket = io(url, {
      // withCredentials: true,
    });

    return () => {
      socket.disconnect();
    };
  }, [url]); */

  const socketurl = import.meta.env.VITE_SOCKET_URL;
  console.log(`Socket URL ${socketurl}`);
  let socket = io(socketurl, {
    // withCredentials: true,
  });

  const sendMessage = (message: any) => {

      socket.emit("send", message);
    
  };

  // const getNewMessage = (callback: (data: any) => void) => {
  //   if (socket) {
  //     socket.on("resp", callback);
  //   }
  // };

  const joinRoom = (roomId: string) => {
    // if (socket) {
      console.log({roomId})
      socket.emit("join", { frq: roomId });
    // }
  };

  const newInvite = ({
    roomId,
    socketRoom,
  }: {
    roomId: string;
    socketRoom: string;
  }) => {

      console.log("new invite data:", { roomId, socketRoom });
      socket.emit("newInvite", { frq: roomId, chatFrq: socketRoom });
    
  };

  // listeing

  const listenNewInvite = () => {

      socket.on("newInviteNotification", (data: any) => {
        setNotifications(data);
      });
    
  };

  return {
    sendMessage,
    joinRoom,
    newInvite,
    listenNewInvite,
    // getNewMessage,
  };
};

export default useSocket;
