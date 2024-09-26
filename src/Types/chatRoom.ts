export interface ChatSocket {
  socket_room: string;
  chat_room_id: number;
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface ChatRoom {
  name: string;
  client_id: number;
  is_group: boolean;
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  is_deleted: boolean;
  chatSocket: ChatSocket;
}
