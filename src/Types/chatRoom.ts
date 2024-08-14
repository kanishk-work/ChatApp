export interface ChatSocket {
  socket_room: string;
  chat_room_id: number;
  id: number;
  updatedAt: string; // ISO 8601 date string
  createdAt: string; // ISO 8601 date string
  deletedAt: string | null; // Nullable ISO 8601 date string
}

export interface ChatRoom {
  name: string;
  client_id: number;
  is_group: boolean;
  id: number;
  updatedAt: string; // ISO 8601 date string
  createdAt: string; // ISO 8601 date string
  deletedAt: string | null; // Nullable ISO 8601 date string
  is_deleted: boolean;
  chatSocket: ChatSocket;
}
