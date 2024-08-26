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

export interface ReplyPayload {
  message: string;
  chat_id: number;
  files_list?: any[]; // You can replace `any` with a more specific type if you know the structure of the items in the files_list array
}