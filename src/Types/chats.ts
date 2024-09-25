export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  client_id: number;
  full_name: string;
  short_name: string | null;
  client_user_id: string;
  role: string;
  email: string;
  mobile_no: string | null;
  profile_pic: string | null;
  status: string;
}

export interface ChatUser {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  chat_room_id: number;
  user_id: number;
  user: User;
  is_group_admin: boolean;
  user_exited: boolean;
}
export interface ChatSocket {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  socket_room: string;
  chat_room_id: number;
}

export interface UnreadMsgs extends Array<{ chat_id: number }> {}

export interface Chat {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  chatUsers: ChatUser[];
  chatSocket: ChatSocket[];
  name: string;
  client_id: number;
  is_group: boolean;
  is_deleted: boolean;
  profile_pic: string | null;
  lastMessage: LatestMessage;
  unreadCount: number;
  unreadMsgs: UnreadMsgs;
}

export interface ChatResponse {
  list: Chat[];
}

export interface ChatStatus {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  user_id: number;
  chat_id: number;
  parent_chat_id: number | null;
  delivered: boolean;
  read: boolean;
}

export interface LatestMessage {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  chatFiles: any[];
  chatReactions: any[];
  chatStatus: ChatStatus[];
  sender_id: number;
  receiver_id: number | null;
  message: string;
  chat_room_id: number;
  is_reply: boolean;
  parent_chat_id: number | null;
  is_deleted: boolean;
}

export interface ConversationsType {
  list: LatestMessage[];
}
