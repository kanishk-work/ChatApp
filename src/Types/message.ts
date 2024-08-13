export interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  chatId: number;
  status?: "sent" | "delivered" | "read";
  messageType?: "text" | "image" | "file";
  mediaUrl?: string;
  reactions?: { [userId: string]: string[] };
}
export interface MessagePayload {
  receiver_id: number;
  message: string;
  chat_room_id: number;
  files_list: string[];
}
