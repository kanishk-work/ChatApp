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
  export interface Chat {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    chatUsers: ChatUser[];
    name: string;
    client_id: number;
    is_group: boolean;
    is_deleted: boolean;
    profile_pic: string | null;
  }
// export interface Chat {
//     id: number;
//     updatedAt: string;
//     createdAt: string;
//     deletedAt: string | null;
//     name: string;
//     client_id: number;
//     is_group: boolean;
//     is_deleted: boolean;
//     status?: "active" | "offline" | "away"; // Customize as needed
//     lastOnline?: string;
// }

export interface ChatResponse {
    list: Chat[];
}
  