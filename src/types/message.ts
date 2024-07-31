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
